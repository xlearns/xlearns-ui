<script setup lang="ts">
import { buttonProps } from "./button";
import { useNamespace } from "@element3/hooks";
defineOptions({
  name: "ElButton",
});

defineProps({ ...buttonProps });

defineEmits({});

const ns = useNamespace("button");
</script>

<template>
  <button :class="ns.b()"><slot /></button>
</template>

<style scoped></style>
