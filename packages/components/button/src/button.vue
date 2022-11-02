<script setup lang="ts">
import { ref } from 'vue'
import { useNamespace } from '@element3/hooks'
import { buttonEmits, buttonProps } from './button'
defineOptions({
  name: 'ElButton',
})
const ns = useNamespace('button')
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
// const slots = useSlots();
const _ref = ref<HTMLButtonElement>()
const _type = props.type || ''

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}

defineExpose({ ref: _ref, type: _type })
</script>

<template>
  <button
    ref="_ref"
    :class="[ns.b(), ns.m(_type), ns.is('plain', plain), ns.is('round', round)]"
    @click="handleClick"
  >
    <template v-if="loading">
      <!-- loader -->
    </template>
    <!-- icon -->
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
