<script setup lang="ts">
import { useNamespace } from '@snowball/hooks'

defineOptions({
  name: 'ElMain',
})

const ns = useNamespace('main')
</script>

<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>
