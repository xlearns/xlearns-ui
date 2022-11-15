import path from 'path'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import {
  PKG_NAME,
  PKG_PREFIX,
  buildConfig,
  epRoot,
  pkgRoot,
  target,
} from '@element3/build'
import { excludeFiles } from '@element3/utils'

import copyType from './copy-type'

import { generateExternal } from './utils'
import type { OutputOptions, Plugin, RollupBuild } from 'rollup'

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

  // await copyType()
}

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
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

buildModules()
