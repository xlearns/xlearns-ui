<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@snowball/hooks'
import { scrollbarProps } from './scrollbar'
import Bar from './bar.vue'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ElScrollbar',
})
const props = defineProps(scrollbarProps)
const ns = useNamespace('scrollbar')

const style = computed(() => {
  const style: CSSProperties = {}
  if (props.height) style.height = props.height
  if (props.maxHeight) style.maxHeight = props.maxHeight
  return [style]
})
</script>

<template>
  <div :class="ns.b()" :style="style">
    <div :class="ns.b('wrap')">
      <slot />
    </div>
    <Bar />
  </div>
</template>

<style scoped></style>
