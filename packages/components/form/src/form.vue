<script setup lang="ts">
import { formProps } from './form'
import { useNamespace } from '@element3/hooks'
defineOptions({
  name: 'ElForm',
})
defineProps({ ...formProps })
defineEmits({})
const ns = useNamespace('form')
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
