import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export function autoResize(el: MaybeComputedElementRef<MaybeElement>) {
  const width = ref()
  const height = ref()
  useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width: w, height: h } = entry.contentRect
    width.value = w
    width.value = h
  })

  return {
    width,
    height,
  }
}
