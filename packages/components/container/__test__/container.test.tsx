import { mount } from '@vue/test-utils'
import { test, describe, expect } from 'vitest'
import Header from '../src/header.vue'
import Aside from '../src/aside.vue'
import Footer from '../src/footer.vue'

describe('Header.vue', () => {
  test('Header render test', async () => {
    const wrapper = mount(() => <Header />)
    expect(wrapper.classes()).toContain('el-header')
  })

  test('Header height', async () => {
    const wrapper = mount(() => <Header height="500px" />)
    const vm = wrapper.vm
    expect(
      getComputedStyle(vm.$el).getPropertyValue('--el-header-height')
    ).toEqual('500px')
  })
})

describe('Footer.vue', () => {
  test('Footer render test', async () => {
    const wrapper = mount(() => <Footer />)
    expect(wrapper.classes()).toContain('el-footer')
  })

  test('Footer height', async () => {
    const wrapper = mount(() => <Footer height="500px" />)
    const vm = wrapper.vm
    expect(
      getComputedStyle(vm.$el).getPropertyValue('--el-footer-height')
    ).toEqual('500px')
  })
})

describe('Aside.vue', () => {
  test('Aside render test', async () => {
    const wrapper = mount(() => <Aside />)
    expect(wrapper.classes()).toContain('el-aside')
  })

  test('Aside height', async () => {
    const wrapper = mount(() => <Aside width="500px" />)
    const vm = wrapper.vm
    expect(
      getComputedStyle(vm.$el).getPropertyValue('--el-aside-width')
    ).toEqual('500px')
  })
})
