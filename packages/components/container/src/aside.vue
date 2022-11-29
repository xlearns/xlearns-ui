<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@snowball/hooks'
import type { CSSProperties } from 'vue'
const ns = useNamespace('aside')

defineOptions({
  name: 'ElAside',
})

const props = defineProps({
  width: {
    type: String,
    default: null,
  },
})

const style = computed(
  () =>
    (props.width ? ns.cssVarBlock({ width: props.width }) : {}) as CSSProperties
)
</script>
<template>
  <aside :class="ns.b()" :style="style">
    <slot />
  </aside>
</template>
