<script setup lang="ts">
import { computed, provide } from 'vue'
import type { CSSProperties } from 'vue'
import { rowProps } from './row'
import { useNamespace } from '@element3/hooks'
import { rowContextKey } from '@element3/tokens'

defineOptions({
  name: 'ElRow',
})

const props = defineProps({ ...rowProps })

defineEmits({})

const ns = useNamespace('row')

const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter,
})

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.marginLeft = styles.marginRight = `-${gutter.value / 2}px`
  }
  return styles
})
</script>

<template>
  <component :is="tag" :class="ns.b()" :style="style"><slot /></component>
</template>
<style scoped></style>
