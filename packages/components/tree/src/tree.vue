<script setup lang="ts">
import { treeProps } from './tree'
import { useNamespace } from '@element3/hooks'
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
