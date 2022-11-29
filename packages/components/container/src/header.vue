<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@snowball/hooks'
import type { CSSProperties } from 'vue'
const ns = useNamespace('header')
defineOptions({
  name: 'ElHeader',
})

const props = defineProps({
  height: {
    type: String,
    default: '60px',
  },
})

const style = computed(() => {
  return props.height
    ? (ns.cssVarBlock({
        height: props.height,
      }) as CSSProperties)
    : {}
})
</script>

<template>
  <header :class="ns.b()" :style="style">
    <slot />
  </header>
</template>
