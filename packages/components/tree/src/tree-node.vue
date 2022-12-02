<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { cloneDeep } from 'lodash-unified'
import { useNamespace } from '@snowball/hooks'
import { treeProps } from './tree'
import type { State, TreeProps } from './type'

const state = reactive<State>({
  data: [],
})
defineOptions({
  name: 'ElTree',
})
const props = defineProps({ ...treeProps })
defineEmits({})

function init() {
  state.data = cloneDeep(props.data) as TreeProps[]
}

onMounted(() => {
  init()
})
const ns = useNamespace('tree')
</script>
<template>
  <div />
</template>
