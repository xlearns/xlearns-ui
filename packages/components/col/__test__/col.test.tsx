
import {describe, expect, it,test } from 'vitest'
import { mount } from '@vue/test-utils'
import Col from '../src/col.vue'
import Row from '@element3/components/row'

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
  

	test('sm-number', () => {
    const wrapper = mount(() => <Col sm={12} />)
    expect(wrapper.classes()).toContain('el-col-sm-12')
	})
	
	test('xs-number', () => {
    const wrapper = mount(() => <Col xs={12} />)
    expect(wrapper.classes()).toContain('el-col-xs-12')
	})

	test('md-number', () => {
    const wrapper = mount(() => <Col md={12} />)
    expect(wrapper.classes()).toContain('el-col-md-12')
	})

  test('lg-number', () => {
    const wrapper = mount(() => <Col lg={12} />)
    expect(wrapper.classes()).toContain('el-col-lg-12')
	})
	
	test('xl-number', () => {
    const wrapper = mount(() => <Col xl={12} />)
    expect(wrapper.classes()).toContain('el-col-xl-12')
	})


	test('xs-object', () => {
    const wrapper = mount(() => <Col xs={{span: 4, offset: 4,pull:4,push:4}} />)
		expect(wrapper.classes()).toContain('el-col-xs-4')
		expect(wrapper.classes()).toContain('el-col-xs-offset-4')
		expect(wrapper.classes()).toContain('el-col-xs-pull-4')
		expect(wrapper.classes()).toContain('el-col-xs-push-4')

	})

	test('sm-object', () => {
    const wrapper = mount(() => <Col sm={{span: 4, offset: 4}} />)
		expect(wrapper.classes()).toContain('el-col-sm-4')
		expect(wrapper.classes()).toContain('el-col-sm-offset-4')
	})

	test('md-object', () => {
    const wrapper = mount(() => <Col md={{span: 4, offset: 4}} />)
		expect(wrapper.classes()).toContain('el-col-md-4')
		expect(wrapper.classes()).toContain('el-col-md-offset-4')
	})

	test('lg-object', () => {
    const wrapper = mount(() => <Col lg={{span: 4, offset: 4}} />)
		expect(wrapper.classes()).toContain('el-col-lg-4')
		expect(wrapper.classes()).toContain('el-col-lg-offset-4')
	})

	test('xl-object', () => {
    const wrapper = mount(() => <Col xl={{span: 4, offset: 4}} />)
		expect(wrapper.classes()).toContain('el-col-xl-4')
		expect(wrapper.classes()).toContain('el-col-xl-offset-4')
	})
 

	test('gutter class test', () => {
		const wrapper = mount({
			setup(){
				return () => (
					<Row gutter={1}><Col ref="col" xl={{ span: 4, offset: 4 }} /></Row>
				)
			}
		})
    // const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement
		// console.log(colElm.style)

		const colElm = wrapper.findComponent({ ref: 'col' }).classes()
		expect(colElm.includes('is-guttered')).toBe(true)
	})

	test('col gutter style test', () => {
		const wrapper = mount({
			setup(){
				return () => (
					<Row gutter={10}><Col ref="col" xl={{ span: 4, offset: 4 }} /></Row>
				)
			}
		})
		const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement;
    
		expect(colElm.style.paddingLeft == colElm.style.paddingRight && colElm.style.paddingLeft == '5px').toBe(true)
	})

	test('row gutter style test', () => {
		const wrapper = mount(() => <Row gutter={50} />)
		const el = wrapper.element as HTMLElement;
		expect(el.style.marginLeft == el.style.marginRight && el.style.marginLeft == '-25px').toBe(true)
	})
})


