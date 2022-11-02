import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../src/button.vue'

const CONTENT = 'Rem is the best girl'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button type="primary" />)
    expect(wrapper.classes()).toContain('el-button--primary')
  })

  it('plain', () => {
    const wrapper = mount(() => <Button plain />)
    expect(wrapper.classes()).toContain('is-plain')
  })

  it('round', () => {
    const wrapper = mount(() => <Button round />)
    expect(wrapper.classes()).toContain('is-round')
  })

  test('click', async () => {
    const wrapper = mount(() => <Button v-slots={{ default: () => CONTENT }} />)
    // console.log(<Button v-slots={{ default: () => CONTENT }} />)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
    // console.log(wrapper.emitted())
  })
})
