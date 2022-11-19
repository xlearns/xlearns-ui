<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useNamespace } from '@element3/hooks'
import { scrollboardProps } from './scrollboard'
import useState from './state'
defineOptions({
  name: 'ElScrollboard',
})
const props = defineProps({ ...scrollboardProps })
const scrollBoard = ref()
const { mergeConfig } = useState(scrollBoard)

function init() {
  mergeConfig(props.config)
}
watchEffect(() => {
  init()
})
defineEmits({})
const ns = useNamespace('scrollboard')
</script>

<template>
  <div ref="scrollBoard" :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
