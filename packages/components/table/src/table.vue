<script setup lang="ts">
import { useNamespace } from '@snowball/hooks'
import { tableProps } from './table'
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
