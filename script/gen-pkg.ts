import { resolve } from 'path'
import { writeFile } from 'fs/promises'
import { PKG_NAME, buildOutput } from '@snowball/build'
const version = '0.0.1'
const path = resolve(buildOutput, 'package.json')

const template = `
  {
  "name": "${PKG_NAME}",
  "version": "${version}",
  "description": "A Component Library for Vue 3",
  "license": "MIT",
  "main": "lib/index.js",
  "module": "es/index.mjs",
  "types": "es/index.d.ts",
  "exports": {
    ".": {
      "require": "./lib/index.js",
      "import": "./es/index.mjs",
      "types": "./es/index.d.ts"
    },
    "./es": "./es/index.mjs",
    "./lib": "./lib/index.js",
    "./es/*.mjs": "./es/*.mjs",
    "./es/*": "./es/*.mjs",
    "./lib/*.js": "./lib/*.js",
    "./lib/*": "./lib/*.js",
    "./*": "./*"
  },
  "unpkg": "dist/index.full.js",
  "jsdelivr": "dist/index.full.js",
  "style": "dist/index.css",
  "sideEffects": [
    "dist/*",
    "theme-chalk/**/*.css",
    "theme-chalk/src/**/*.scss",
    "es/components/*/style/*",
    "lib/components/*/style/*"
  ],
  "peerDependencies": {
    "vue": "^3.2.0"
  },
  "browserslist": [
    "> 1%",
    "not ie 11",
    "not op_mini all"
  ]
}
  `

function main() {
  writeFile(path, template)
}

main()
