import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import process from 'process'
import { Project } from 'ts-morph'
import glob from 'fast-glob'
import * as vueCompiler from 'vue/compiler-sfc'

import consola from 'consola'
import { excludeFiles } from '@snowball/build/pkg'
import { epOutput, epRoot, pkgRoot, projRoot } from '@snowball/build'
import type { CompilerOptions, SourceFile } from 'ts-morph'
/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json')

const outDir = path.resolve(epOutput, 'types')
const main = async () => {
  // 覆盖tsconfig.json
  const compilerOptions: CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projRoot,
    // preserveSymlinks: true,  会导致触发 Vue TS 2305
    skipLibCheck: true,
    noImplicitAny: false,
  }

  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files')
  typeCheck(project)
  consola.success('Type check passed!')
  await project.emit({
    emitOnlyDtsFiles: true,
  })

  build(sourceFiles)
}
// 输出解析过程中的错误信息

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}

async function addSourceFiles(project: Project) {
  // project.addSourceFileAtPath(path.resolve(projRoot, "typings/env.d.ts"));
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!snowball/**/*'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: epRoot,
      onlyFiles: true,
    })
  )
  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        // 是否全局忽略ts
        const hasTsNoCheck = content.includes('@ts-nocheck')
        // vue -> ast
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          /**
           * @description
           *  如果全局忽略 则不做任何处理
           *  script?.content script内容
           */
          let content =
            (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
          }
          const lang = scriptSetup?.lang || script?.lang || 'js'
          const F = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(F)
        }
      } else {
        const F = project.addSourceFileAtPath(file)
        sourceFiles.push(F)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await readFile(path.resolve(epRoot, file), 'utf-8')
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      )
    }),
  ])

  return sourceFiles
}

async function build(sourceFiles) {
  const Tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true,
      })
      await writeFile(filepath, outputFile.getText(), 'utf8')
    })
    await Promise.all(subTasks)
  })
  await Promise.all(Tasks)
}

main()
