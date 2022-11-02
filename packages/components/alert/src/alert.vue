<script setup lang="ts">
import { useNamespace } from '@element3/hooks'
import { alertProps } from './alert'
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
