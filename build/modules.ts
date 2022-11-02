import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { epRoot, pkgRoot, epOutput, ePackage } from '@element3/build'
import { excludeFiles } from '@element3/utils'
import type { OutputOptions } from 'rollup'
import path from 'path'
import type { Plugin } from 'rollup'
import copyType from './copy-type'

const PKG_NAME = 'element3'
const PKG_PREFIX = '@element3'
const target = 'es2018'
export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      plugin(),
      DefineOptions(),
      vue({
        isProduction: false,
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
        },
      }),
    ] as any,
    external: await generateExternal({ full: false }),
    treeshake: false,
  })

  const buildConfig = {
    esm: {
      module: 'ESNext',
      format: 'esm',
      ext: 'mjs',
      output: {
        name: 'es',
        path: path.resolve(epOutput, 'es'),
      },
      bundle: {
        path: `es`,
      },
    },
    cjs: {
      module: 'CommonJS',
      format: 'cjs',
      ext: 'js',
      output: {
        name: 'lib',
        path: path.resolve(epOutput, 'lib'),
      },
      bundle: {
        path: `lib`,
      },
    },
  }

  const buildConfigEntries = Object.entries(buildConfig)

  const _b = buildConfigEntries.map(([module, config]): OutputOptions => {
    return {
      format: config.format as any,
      dir: config.output.path,
      exports: module === 'cjs' ? 'named' : undefined,
      preserveModules: true,
      preserveModulesRoot: epRoot,
      sourcemap: true,
      entryFileNames: `[name].${config.ext}`,
    }
  })

  await writeBundles(bundle, _b)

  await copyType()
}

function writeBundles(bundle, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

function plugin(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'element3-alias-plugin',
    resolveId(id: any) {
      if (!id.startsWith(sourceThemeChalk)) return
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute',
      }
    },
  }
}
type ResponseData = { full: boolean }

async function generateExternal(options: ResponseData) {
  const { dependencies, peerDependencies } = getPackageDependencies(ePackage)
  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}
const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = require(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

buildModules()
