<script setup lang="ts">
import { useNamespace } from '@snowball/hooks'
import { treeNodeProps } from './tree'

defineOptions({
  name: 'TreeNode',
})

defineProps({ ...treeNodeProps })

defineEmits({})

const ns = useNamespace('tree-node')
</script>
<template>
  <ul :class="ns.b()">
    <li :class="ns.b('li')">
      <span :class="ns.b('tree-expand')">
        <span v-if="data.children && data.children.length && !data.expand"
          >+</span
        >
        <span v-else-if="data.children && data.children.length && data.expand"
          >-</span
        >
      </span>
      <input v-if="showCheckbox" :value="data.checked" />
      <span>{{ data.label }}</span>
      <template v-if="data.expand">
        <tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        />
      </template>
    </li>
  </ul>
</template>
