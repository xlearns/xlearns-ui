<script setup lang="ts">
import { computed } from "vue";
import { useNamespace } from "@element3/hooks";
defineOptions({
  name: "ElGridLayout",
});

const props = defineProps({
  columns: {
    type: String,
    default: "1fr",
  },
  rows: {
    type: String,
    default: "1fr",
  },
  areas: {
    type: Array,
    default: [],
  },
  gap: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "100%",
  },
});

defineEmits({});

const ns = useNamespace("grid-layout");

const style = computed(() => {
  const areas = `nav nav nav nav`;
  return {
    "grid-template-columns": props.columns,
    "grid-template-rows": props.rows,
    "grid-template-areas": areas,
    "grid-gap": props.gap,
    height: props.height,
  };
});
</script>

<template>
  <div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
