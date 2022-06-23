<script setup lang="ts">
import { buttonProps } from "./button";
defineOptions({
  name: "ElButton",
});

console.log(buttonProps);
</script>

<template>
  <button class="el-button"><slot /></button>
</template>

<style scoped></style>
