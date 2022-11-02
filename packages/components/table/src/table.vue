<script setup lang="ts">
import { tableProps } from './table'
import { useNamespace } from '@element3/hooks'
defineOptions({
  name: 'ElTable',
})
defineProps({ ...tableProps })
defineEmits({})
const ns = useNamespace('table')
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
