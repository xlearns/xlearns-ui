<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { cloneDeep } from 'lodash-unified'
import { useNamespace } from '@snowball/hooks'
import { treeProps } from './tree'
import type { TreeNode, TreeProps } from './type'

const state = reactive<TreeNode>({
  data: {},
})
defineOptions({
  name: 'ElTree',
})
const props = defineProps({ ...treeProps })
defineEmits({})

function init() {
  state.data = cloneDeep(props.data) as TreeProps
}

onMounted(() => {
  init()
})
const ns = useNamespace('tree-node')
</script>
<template>
  <ul :class="ns.b()">
    <li :class="ns.b('li')">
      <span :class="ns.b('tree-expand')">
        <span
          v-if="
            state.data.children &&
            state.data.children.length &&
            !state.data.expand
          "
          >+</span
        >
        <span
          v-if="
            state.data.children &&
            state.data.children.length &&
            state.data.expand
          "
          >-</span
        >
      </span>
      <!-- <input v-if="showCheckbox" :value="state.data.checked" /> -->
    </li>
  </ul>
</template>
