import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Layout from '../src/grid-layout.vue'
import Item from '../src/grid-layout-item.vue'

describe('grid-layout test', () => {
  it('Grid Layout create', () => {
    const wrapper = mount(() => <Layout />)
    expect(wrapper.classes()).toContain('el-grid-layout')
  })

  it('Grid Layout item create', () => {
    const wrapper = mount(() => <Item name="haha" />)
    expect(wrapper.classes()).toContain('el-grid-layout-item')
  })

  it('Grid Layout item name', () => {
    const wrapper = mount(() => <Item name="haha" />)
    let dom = wrapper.find('.el-grid-layout-item')
    expect(dom.attributes('style')).toContain('grid-area: haha')
  })
})
