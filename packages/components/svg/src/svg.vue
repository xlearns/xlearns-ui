<script setup lang="ts">
import { useNamespace } from '@element3/hooks'
import { svgProps } from './svg'
defineOptions({
  name: 'ElSvg',
})
defineProps({ ...svgProps })
defineEmits({})
const ns = useNamespace('svg')
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
