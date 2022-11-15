import path from 'path'
import { name } from '../package.json'
import { epOutput } from './paths'

export type Module = 'esm' | 'cjs'

// export const PKG_NAME = "element3";

export const PKG_NAME = name || '..'

export const PKG_PREFIX = '@element3'

export const buildConfig = {
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
