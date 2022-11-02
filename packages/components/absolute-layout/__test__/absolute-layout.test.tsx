import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import AbsoluteLayout from '../src/absolute-layout.vue'
import AbsoluteLayoutItem from '../src/absolute-layout-item.vue'

describe('absolute-layout test', () => {
  test('AbsoluteLayout class', () => {
    const wrapper = mount({
      setup() {
        return () => <AbsoluteLayout />
      },
    })
    expect(wrapper.classes().includes('el-absolute-layout')).toBe(true)
  })

  test('AbsoluteLayoutItem class', () => {
    const wrapper = mount({
      setup() {
        return () => <AbsoluteLayoutItem />
      },
    })
    expect(wrapper.classes().includes('el-absolute-layout-item')).toBe(true)
  })

  test('AbsoluteLayout width', () => {
    const wrapper = mount(() => <AbsoluteLayout width={'100px'} />)
    const el = wrapper.element as HTMLElement
    expect(el.style.width == '100px').toBe(true)
  })

  test('AbsoluteLayout height', () => {
    const wrapper = mount(() => <AbsoluteLayout height={'100px'} />)
    const el = wrapper.element as HTMLElement
    expect(el.style.height == '100px').toBe(true)
  })

  test('AbsoluteLayoutItem option', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <AbsoluteLayout>
            <AbsoluteLayoutItem
              option={{ width: '150px', x: '100px', y: '-100px' }}
              ref="item"
            ></AbsoluteLayoutItem>
          </AbsoluteLayout>
        )
      },
    })
    const el = wrapper.findComponent({ ref: 'item' }).element as HTMLElement

    expect(
      el.style.width == '150px' &&
        el.style.height == '50px' &&
        el.style.left == '100px' &&
        el.style.top == '-100px'
    ).toBe(true)
  })
})
