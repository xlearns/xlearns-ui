<script setup lang="ts">
import { useNamespace } from '@element3/hooks'
const ns = useNamespace('scrollbar')
</script>

<template>
  <div :class="ns.b('bar')">
    <div :class="ns.b('thumb')"></div>
  </div>
</template>

<style scoped></style>
