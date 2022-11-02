<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNamespace } from '@element3/hooks'

interface _config {
  x: string
  y: string
  w: string
  h: string
}
const config = ref<_config>({ x: '0', y: '0', w: '50px', h: '50px' })

defineOptions({
  name: 'ElLayoutItem',
})

const defaultConfig = {
  x: '0',
  y: '0',
  w: '50px',
  h: '50px',
}

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
})

defineEmits({})

const ns = useNamespace('layout-item')

onMounted(() => {
  config.value = Object.assign(defaultConfig, props.option)
})

const style = computed(() => {
  const { w, h, x, y } = config.value
  return {
    width: w,
    height: h,
    left: x,
    top: y,
  }
})
</script>

<template>
  <div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
