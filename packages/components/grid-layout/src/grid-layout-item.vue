<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@element3/hooks'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ElGridLayoutItem',
})

defineEmits({})

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const ns = useNamespace('grid-layout-item')

const style = computed(() => {
  const _style: CSSProperties = {}

  const attrs = [{ name: 'grid-area', value: 'name' }] as const

  attrs.forEach((attr) => {
    if (typeof attr === 'object' && attr != null) {
      _style[attr.name] = props[attr.value]
    }
  })
  return _style
})
</script>

<template>
  <div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
