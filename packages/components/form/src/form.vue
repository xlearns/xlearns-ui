<script setup lang="ts">
import { useNamespace } from '@snowball/hooks'
import { formProps } from './form'
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
