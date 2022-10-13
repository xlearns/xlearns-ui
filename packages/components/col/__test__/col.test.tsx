
import {describe, expect, it,test } from 'vitest'
import { mount } from '@vue/test-utils'
import Col from '../src/col.vue'

describe('col test', () => {
	test('create', () => {
		 const wrapper = mount(() => <Col />)
		expect(wrapper.classes()).toContain('el-col')
	})

	test('span', () => {
    const wrapper = mount(() => <Col span={12} />)
    expect(wrapper.classes()).toContain('el-col-12')
	})

	test('pull', () => {
    const wrapper = mount(() => <Col pull={12} />)
    expect(wrapper.classes()).toContain('el-col-pull-12')
	})

  test('push', () => {
    const wrapper = mount(() => <Col push={12} />)
    expect(wrapper.classes()).toContain('el-col-push-12')
	})

	 test('offset', () => {
    const wrapper = mount(() => <Col offset={12} />)
    expect(wrapper.classes()).toContain('el-col-offset-12')
	})
})


