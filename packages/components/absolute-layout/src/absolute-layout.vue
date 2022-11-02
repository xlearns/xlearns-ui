<script setup lang="ts">
import { useNamespace } from '@element3/hooks'
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
defineOptions({
  name: 'ElAbsoluteLayout',
})

const props = defineProps({
  width: {
    type: String,
    default: '1920px',
  },
  height: {
    type: String,
    default: '1080px',
  },
})

defineEmits({})

const ns = useNamespace('absolute-layout')

const style = computed(() => {
  const _style: CSSProperties = {}
  const attrs = ['width', 'height'] as const
  attrs.forEach((attr) => {
    _style[attr] = props[attr]
  })
  return _style
})
</script>

<template>
  <div :class="ns.b()" :style="style"><slot /></div>
</template>
