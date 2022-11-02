import fileSave from 'file-save'
import { promises as fs } from 'fs'
import { resolve, join } from 'path'
import upperCamelCase from 'uppercamelcase'
import MagicString from 'magic-string'
import { log } from '@element3/utils'

const root = process.cwd()
const name = process.argv[2]
let upper_name, pgk_path, components_path, element3_path, theme_path

/**
 * @description init
 */
function init() {
  return new Promise((res, err) => {
    pgk_path = resolve(root, 'packages')
    components_path = resolve(pgk_path, 'components')
    element3_path = resolve(pgk_path, 'element3')
    theme_path = resolve(pgk_path, 'theme-chalk')
    if (name) {
      upper_name = upperCamelCase(name)
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
async function update_com_index() {
  let path = resolve(components_path, 'index.ts')
  let indexText = await fs.readFile(path)
  const tp_com_index = `${indexText}export * from "./${name}";`
  create(path, tp_com_index)
}

/**
 * @description element3 components index
 */
async function update_element_com() {
  let path = resolve(element3_path, 'component.ts')
  let indexText = await fs.readFile(path)
  let text = String(indexText)
  let startIndex = text.indexOf(']')
  const s = new MagicString(text)
  s.overwrite(startIndex, startIndex + 1, `,El${upper_name}]`)
  s.prepend(`import { El${upper_name} } from "@element3/components/${name}";`)
  create(path, s.toString())
}

/**
 * @description components name
 */
function update_com_name_index() {
  const tp_com_name_index = `
  import { withInstall } from "@element3/utils";
  import ${upper_name} from "./src/${name}.vue";
  export const El${upper_name} = withInstall(${upper_name});
  export default El${upper_name};
  export * from "./src/${name}";
  `
  create(resolve(components_path, `${name}/index.ts`), tp_com_name_index)
}

/**
 * @description components main
 */
function update_com_name_main_style_css() {
  create(resolve(components_path, `${name}/style/css.ts`), '')
}
function update_com_name_main_style_index() {
  const template = `
	import "@element3/theme-chalk/src/base.css";
  import "@element3/theme-chalk/src/${name}.scss";
	`
  create(resolve(components_path, `${name}/style/index.ts`), template)
}

// src
function update_com_name_main_src_ts() {
  const template = `
export const ${name}Types = [] as const;
export const ${name}Props = {}
	`
  create(resolve(components_path, `${name}/src/${name}.ts`), template)
}

function update_com_name_main_src_vue() {
  const template = `
<script setup lang="ts">
import { ${name}Props } from "./${name}";
import { useNamespace } from "@element3/hooks";
	defineOptions({
		name: "El${upper_name}",
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
  create(resolve(components_path, `${name}/src/${name}.vue`), template)
}

// test
function update_com_name_main_test_index() {
  const template = `
import {describe, expect, it } from 'vitest'
describe('${name} test', () => {
	it('test 1', () => {
		expect(1 + 1).toEqual(2)
	})
})`
  create(
    resolve(components_path, `${name}/__test__/${name}.test.tsx`),
    template
  )
}

function update_com_name_main() {
  //style
  update_com_name_main_style_index()
  update_com_name_main_style_css()
  //src
  update_com_name_main_src_vue()
  update_com_name_main_src_ts()
  //__test__
  update_com_name_main_test_index()
}

//theme-chalk
function update_theme_scss() {
  let template = `
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
  create(resolve(theme_path, `src/${name}.scss`), template)
}

async function update_theme_index() {
  let path = resolve(theme_path, `src/index.scss`)
  let indexText = await fs.readFile(path)
  const template = `${indexText}@use "./${name}.scss";`
  create(path, template)
}

async function update_theme_com_var() {
  let path = resolve(theme_path, `src/common/var.scss`)
  let indexText = await fs.readFile(path)
  const template = `
// ${upper_name}
$${name}: () !default;
$${name}: map.merge(('bg-color': getCssVar('fill-color', 'black'),'text-color':getCssVar('color-white'),'opacity': 1),$${name});
	`
  const temp = `${indexText}${template}`
  create(path, temp)
}
function update_theme_main() {
  update_theme_scss()
  update_theme_index()
  update_theme_com_var()
}
async function main() {
  try {
    await init()
    update_com_name_index()
    update_com_index()
    update_element_com()
    update_com_name_main()
    update_theme_main()
    log('✔ 创建完成', 'green')
  } catch (e) {
    log(e)
  }
}

main()
