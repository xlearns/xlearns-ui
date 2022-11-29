import { resolve } from 'path'
import { promises as fs } from 'fs'
import fileSave from 'file-save'
import upperCamelCase from 'uppercamelcase'
import MagicString from 'magic-string'
import shell from 'shelljs'
import { log } from '@snowball/build'

const root = process.cwd()
const name = process.argv[2]
let upperName, pgkPath, componentsPath, snowballPath, themePath, typePath

/**
 * @description init
 */
function init() {
  return new Promise((res, err) => {
    pgkPath = resolve(root, 'packages')
    componentsPath = resolve(pgkPath, 'components')
    snowballPath = resolve(pgkPath, 'snowball')
    themePath = resolve(pgkPath, 'theme-chalk')
    typePath = resolve(root, 'typings')
    if (name) {
      upperName = upperCamelCase(name)
      res(true)
    } else {
      err(
        new Error(`
❌ name is undefined please input name
👉 eg: npm run new name`)
      )
    }
  })
}

/**
 * @description create mkdir and file
 */
function create(url, content) {
  fileSave(url).write(content, 'utf8').end('\n')
}

/**
 * @description components index
 */
async function updateComIndex() {
  const path = resolve(componentsPath, 'index.ts')
  const indexText = await fs.readFile(path)
  const _ = `${indexText}export * from "./${name}";`
  create(path, _)
}

/**
 * @description snowball components index
 */
async function updateElementCom() {
  const path = resolve(snowballPath, 'component.ts')
  const indexText = await fs.readFile(path)
  const text = String(indexText)
  const startIndex = text.indexOf(']')
  const s = new MagicString(text)
  s.overwrite(startIndex, startIndex + 1, `El${upperName}]`)
  s.prepend(`import { El${upperName} } from "@snowball/components/${name}";`)
  create(path, s.toString())
}

/**
 * @description components name
 */
function updateComNameIndex() {
  const _ = `
  import { withInstall } from "@snowball/utils";
  import ${upperName} from "./src/${name}.vue";
  export const El${upperName} = withInstall(${upperName});
  export default El${upperName};
  export * from "./src/${name}";
  `
  create(resolve(componentsPath, `${name}/index.ts`), _)
}

/**
 * @description components main
 */
function updateComNameMainStyleCss() {
  create(resolve(componentsPath, `${name}/style/css.ts`), '')
}
function updateComNameMainStyleIndex() {
  const template = `
	import "@snowball/theme-chalk/src/base.css";
  import "@snowball/theme-chalk/src/${name}.scss";
	`

  const template2 = `
  import '@snowball/theme-chalk/base.css';
  import '@snowball/theme-chalk/${name}.css';
  `

  create(resolve(componentsPath, `${name}/style/index.ts`), template)
  create(resolve(componentsPath, `${name}/style/css.ts`), template2)
}

// src
function updateComNameMainSrcTs() {
  const template = `
export const ${name}Types = [] as const;
export const ${name}Props = {}
	`
  create(resolve(componentsPath, `${name}/src/${name}.ts`), template)
}

function updateComNameMainSrcVue() {
  const template = `
<script setup lang="ts">
import { ${name}Props } from "./${name}";
import { useNamespace } from "@snowball/hooks";
	defineOptions({
		name: "El${upperName}",
	});
	defineProps({ ...${name}Props });
	defineEmits({});
	const ns = useNamespace("${name}");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
	`
  create(resolve(componentsPath, `${name}/src/${name}.vue`), template)
}

// test
function updateComNameMainTestIndex() {
  const template = `
import {describe, expect, it } from 'vitest'
describe('${name} test', () => {
	it('test 1', () => {
		expect(1 + 1).toEqual(2)
	})
})`
  create(resolve(componentsPath, `${name}/__test__/${name}.test.tsx`), template)
}

//type
async function updateTypeCompontns() {
  const path = resolve(typePath, 'components.d.ts')
  const indexText = await fs.readFile(path)
  const text = String(indexText)
  const startIndex = text.indexOf('export interface GlobalComponents {')
  const s = new MagicString(text)
  s.overwrite(
    startIndex,
    startIndex + 1,
    `El${upperName}:typeof import('../packages/snowball')['El${upperName}']`
  )
  create(path, s.toString())
}

function updateComNameMain() {
  //style
  updateComNameMainStyleIndex()
  updateComNameMainStyleCss()
  //src
  updateComNameMainSrcVue()
  updateComNameMainSrcTs()
  //__test__
  updateComNameMainTestIndex()
  //typys
  updateTypeCompontns()
}

//theme-chalk
function updateThemeScss() {
  const template = `
@use "sass:map";
@use "common/var" as *;
@use "mixins/function" as *;
@use "mixins/mixins" as *;
// set ${name} var
@include b(${name}) {
	@include set-component-css-var("${name}", $${name});
}

@include b(${name}) {
	display: inline-block;
  color: getCssVar('${name}', 'text-color');
}
	`
  create(resolve(themePath, `src/${name}.scss`), template)
}

async function updateThemeIndex() {
  const path = resolve(themePath, `src/index.scss`)
  const indexText = await fs.readFile(path)
  const template = `${indexText}@use "./${name}.scss";`
  create(path, template)
}

async function updateThemeComVar() {
  const path = resolve(themePath, `src/common/var.scss`)
  const indexText = await fs.readFile(path)
  const template = `
// ${upperName}
$${name}: () !default;
$${name}: map.merge(('bg-color': getCssVar('fill-color', 'black'),'text-color':getCssVar('color-white'),'opacity': 1),$${name});
	`
  const temp = `${indexText}${template}`
  create(path, temp)
}
function updateThemeMain() {
  updateThemeScss()
  updateThemeIndex()
  updateThemeComVar()
}
async function main() {
  try {
    await init()
    updateComNameIndex()
    updateComIndex()
    updateElementCom()
    updateComNameMain()
    updateThemeMain()
    log('✔ 创建完成', 'green')
    shell.exec('pnpm format')
  } catch (e) {
    log(e)
  }
}

main()
