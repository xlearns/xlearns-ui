import vuePlugin from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

const name = 'Element3'
const cjsConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName('cjs'),
    format: 'cjs',
  },
}
const globalConfig = {
  plugins: [
    replace({
      __DEV__: true,
      'process.env.NODE_ENV': true,
    }),
  ],
  output: {
    file: createFileName('global'),
    format: 'iife',
    name,
  },
}
const globalProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
      'process.env.NODE_ENV': true,
    }),
  ],
  output: {
    file: createFileName('global.prod'),
    format: 'iife',
    name,
  },
}

const createBaseConfig = () => {
  // const entry = path.resolve(p, "./index.ts");
  const entry = '../packages/element/index.ts'
  return {
    input: entry,
    external: ['vue'],
    plugins: [
      peerDepsExternal(),
      vuePlugin(),
      ts(),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.vue'],
        babelHelpers: 'bundled',
      }),
      resolve({
        extensions: ['.vue', '.jsx', '.js'],
      }),
      commonjs(),
      json(),
      scss(),
    ],
    output: {
      sourcemap: false,
      externalLiveBindings: false,
      globals: {
        vue: 'Vue',
      },
    },
  }
}

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig)
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins)
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output)

  return config
}

function createPackageConfigs() {
  return [cjsConfig, globalConfig, globalProdConfig].map((formatConfig) => {
    return mergeConfig(createBaseConfig(), formatConfig)
  })
}

function createFileName(formatName) {
  return `dist/element3.${formatName}.js`
}

export default createPackageConfigs()
