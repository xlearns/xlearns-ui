<script setup lang="ts">
import { gridLayoutProps } from "./grid-layout";
import { useNamespace } from "@element3/hooks";
defineOptions({
  name: "ElGridLayout",
});
defineProps({ ...gridLayoutProps });
defineEmits({});
const ns = useNamespace("grid-layout");
</script>

<template>
  <div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
