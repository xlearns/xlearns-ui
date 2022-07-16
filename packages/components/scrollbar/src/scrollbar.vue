<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import Bar from "./bar.vue";
import { scrollbarProps } from "./scrollbar";
const props = defineProps(scrollbarProps);

defineOptions({
  name: "ElScrollbar",
});
const style = computed(() => {
  const style: CSSProperties = {};
  if (props.height) style.height = props.height;
  if (props.maxHeight) style.maxHeight = props.maxHeight;
  return [style];
});
</script>

<template>
  <div class="scrollbar" :style="style">
    <div class="scrollbar-wrap">
      <slot />
    </div>
    <Bar />
  </div>
</template>

<style scoped></style>
