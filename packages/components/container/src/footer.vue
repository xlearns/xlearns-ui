<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@element3/hooks'
import type { CSSProperties } from 'vue'
const ns = useNamespace('footer')

defineOptions({
  name: 'ElFooter',
})

const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})

const style = computed(
  () =>
    (props.height
      ? ns.cssVarBlock({ height: props.height })
      : {}) as CSSProperties
)
</script>
<template>
  <footer :class="ns.b()" :style="style">
    <slot />
  </footer>
</template>
