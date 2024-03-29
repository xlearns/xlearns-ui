<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '@snowball/hooks'
import { rowContextKey } from '@snowball/tokens'
import { colProps } from './col'
import type { CSSProperties } from 'vue'

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

defineOptions({
  name: 'ElCol',
})

defineEmits({})

const props = defineProps({ ...colProps })

const ns = useNamespace('col')

const style = computed(() => {
  const styles: CSSProperties = {}

  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }

  return styles
})

const classes = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    if (prop == 'span') {
      classes.push(ns.b(`${props[prop]}`))
    } else {
      classes.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  sizes.forEach((size) => {
    if (typeof props[size] == 'number') {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (typeof props[size] == 'object' && props[size] != null) {
      Object.entries(props[size]).forEach(([key, val]) => {
        classes.push(
          key !== 'span'
            ? ns.b(`${size}-${key}-${val}`)
            : ns.b(`${size}-${val}`)
        )
      })
    }
  })

  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }

  return classes
})
</script>

<template>
  <component :is="tag" :class="[ns.b(), classes]" :style="style"
    ><slot
  /></component>
</template>
<style scoped></style>
