<script setup lang="ts">
import { ElButton, ElScrollbar } from "@element3/components";
</script>

<template>
  <ElButton>hello</ElButton>
  <ElScrollbar height="400px">
    <div style="background: red; margin: 20px" v-for="num in 4000" :key="num">
      {{ num }}
    </div>
  </ElScrollbar>
</template>

<style scoped>
html,
body {
  width: 100vw;
  height: 100vh;
}
</style>
