import path from 'path'
import { name } from '../package.json'
import { epOutput } from './paths'
import type { ModuleFormat } from 'rollup'

export type Module = 'esm' | 'cjs'
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    name: string
    path: string
  }

  bundle: {
    path: string
  }
}

export const PKG_NAME = name || '..'

export const PKG_PREFIX = '@snowball'

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
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
      path: `${PKG_NAME}/lib`,
    },
  },
}

export const target = 'es2018'

export const buildConfigEntries = Object.entries(buildConfig)
