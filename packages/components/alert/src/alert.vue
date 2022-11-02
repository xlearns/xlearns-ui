<script setup lang="ts">
import { alertProps } from './alert'
import { useNamespace } from '@element3/hooks'
defineOptions({
  name: 'ElAlert',
})
defineProps({ ...alertProps })
defineEmits({})
const ns = useNamespace('alert')
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
