import { mount } from '@vue/test-utils'
import { test } from 'vitest'
import Drag from '../drag'
import type { VNode } from 'vue'
const _mount = (render: () => VNode) =>
  mount(render, {
    global: {
      directives: { Drag },
    },
    attachTo: document.body,
  })

test('drag directives test', () => {
  const wrapper = _mount(() => (
    <div v-drag>
      <button class="button-1" />
      <button class="button-2" />
      <button class="button-3" />
    </div>
  ))
  // console.log(wapper)
})
