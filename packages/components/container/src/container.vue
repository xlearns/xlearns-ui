<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNamespace } from '@snowball/hooks'
import type { Component, VNode } from 'vue'

const slots = useSlots()

defineOptions({
  name: 'ElContainer',
})

const props = defineProps({
  direction: {
    type: String,
  },
})
const ns = useNamespace('container')

const isVertical = computed(() => {
  if (props.direction === 'vertical') {
    return true
  } else if (props.direction === 'horizontal') {
    return false
  }
  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()
    return vNodes.some((vNode) => {
      const tag = (vNode.type as Component).name
      return tag === 'ElHeader' || tag === 'ElFooter'
    })
  } else {
    return false
  }
})
</script>
<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>
