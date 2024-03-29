import path from 'path'
import { promises as fs } from 'fs'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import caseTransform from 'name-case-transform'
import chalk from 'chalk'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import { epOutput, epRoot } from './paths'
import genDts from './gen-dts'
import { PKG_NAME, PKG_PREFIX } from './info'
import { entryPlugin } from './rollup.plugin'
/**
 * Fock: https://github.com/Dreamerryao/element-plus/blob/85849419f14e2c29eab8354c196ab232be97ba14/build/full-bundle.ts
 */
const excludes = ['icons']

;(async () => {
  const config = {
    input: path.resolve(epRoot, './index.ts'),
    plugins: [
      nodeResolve(),
      DefineOptions(),
      vue({
        target: 'browser',
        exposeFilename: false,
      }),
      commonjs(),
      esbuild({
        minify: false,
      }),
    ],
    external(id: string) {
      return /^vue/.test(id)
    },
  }

  const umd = {
    format: 'umd',
    file: path.resolve(epOutput, 'dist/index.js'),
    exports: 'named',
    name: caseTransform(PKG_NAME, 'A'),
    globals: {
      vue: 'Vue',
    },
  }

  const umdMinified = {
    ...umd,
    file: path.resolve(epOutput, 'dist/index.full.js'),
  }

  console.log(chalk.bold(chalk.yellow('Building bundle')))

  const bundle = await rollup({
    ...config,
    plugins: [...config.plugins, entryPlugin()] as any,
  })

  console.log(chalk.yellow('Generating index.full.js'))

  await bundle.write(umdMinified as any)
  console.log(chalk.green('index.full.js generated'))

  console.log(chalk.yellow('Generating entry files without dependencies'))

  const entryFiles = await fs.readdir(epRoot, {
    withFileTypes: true,
  })

  const entryPoints = entryFiles
    .filter((f) => f.isFile())
    .filter((f) => {
      return f.name !== 'package.json' && f.name !== 'README.md'
    })
    .map((f) => path.resolve(epRoot, f.name))

  const entryBundle = await rollup({
    ...config,
    input: entryPoints,
    external: () => true,
  } as any)

  const rewriter = (id: any) => {
    if (id.startsWith(`${PKG_PREFIX}/components`))
      return id.replace(`${PKG_PREFIX}/components`, './components')
    if (id.startsWith(PKG_PREFIX) && excludes.every((e) => !id.endsWith(e)))
      return id.replace(PKG_PREFIX, '.')
  }

  console.log(chalk.yellow('Generating cjs entry'))

  await entryBundle.write({
    format: 'cjs',
    dir: path.resolve(epOutput, 'lib'),
    exports: 'named',
    paths: rewriter,
  })

  console.log(chalk.green('cjs entry generated'))

  console.log(chalk.yellow('Generating esm entry'))

  await entryBundle.write({
    format: 'esm',
    dir: path.resolve(epOutput, 'es'),
    paths: rewriter,
  })

  console.log(chalk.green('esm entry generated'))

  console.log(chalk.bold(chalk.green('Full bundle generated')))

  console.log(chalk.yellow('Generate entry file definitions'))

  await genDts()

  console.log(chalk.green('Entry file definitions generated'))
})()
