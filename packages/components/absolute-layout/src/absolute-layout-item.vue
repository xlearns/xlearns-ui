<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@element3/hooks'
import type { CSSProperties, PropType } from 'vue'

type Option = {
  x?: string
  y?: string
  width?: string
  height?: string
}

defineOptions({
  name: 'ElAbsoluteLayoutItem',
})

const defaultConfig = {
  x: '0',
  y: '0',
  width: '50px',
  height: '50px',
}

const props = defineProps({
  option: {
    type: Object as PropType<Option>,
    default: () => ({}),
  },
})

defineEmits({})

const ns = useNamespace('absolute-layout-item')

const style = computed(() => {
  const _style: CSSProperties = {}
  const attrs = [
    'width',
    'height',
    { name: 'x', value: 'left' },
    { name: 'y', value: 'top' },
  ] as const

  attrs.forEach((attr) => {
    if (typeof attr == 'object' && attr != null) {
      _style[attr.value] = props.option[attr.name] || defaultConfig[attr.name]
    } else {
      _style[attr] = props.option[attr] || defaultConfig[attr]
    }
  })
  return _style
})
</script>

<template>
  <div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
