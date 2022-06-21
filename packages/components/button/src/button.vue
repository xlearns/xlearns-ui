<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
import { buttonProps } from "./button";
console.log(buttonProps);
export default {
  name: "ElButton",
  setup() {
    return {};
  },
};
</script>

<style scoped></style>
