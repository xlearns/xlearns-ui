<script setup lang="ts">
import { useNamespace } from '@element3/hooks'
import { treeProps } from './tree'
defineOptions({
  name: 'ElTree',
})
defineProps({ ...treeProps })
defineEmits({})
const ns = useNamespace('tree')
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
