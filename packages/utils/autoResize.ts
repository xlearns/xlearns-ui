import { useElementSize } from '@vueuse/core'
import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export function autoResize(el: MaybeComputedElementRef<MaybeElement>) {
  const { width, height } = useElementSize(el)
  return {
    width,
    height,
  }
}
