import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { observerDomResize } from './index'
import type { Ref } from 'vue'
export const autoResize = (
  dom: Ref<HTMLElement | null>,
  onResize?: () => void,
  afterAutoResizeMixinInit?: () => void
) => {
  const width = ref(0)
  const height = ref(0)
  const show = ref(false)
  let debounceInitWHFun: () => void
  let domObserver: MutationObserver | null = null
  let domHtml: HTMLElement | null = null

  const initWH = (resize = true) => {
    show.value = false
    return new Promise((resolve) => {
      nextTick(() => {
        domHtml = dom.value
        width.value = dom.value ? dom.value.clientWidth : 0
        height.value = dom.value ? dom.value.clientHeight : 0
        show.value = true
        if (!dom.value)
          console.warn(
            'Failed to get dom node, component rendering may be abnormal!'
          )
        else if (!width.value || !height.value)
          console.warn(
            'Component width or height is 0px, rendering abnormality may occur!'
          )

        if (typeof onResize === 'function' && resize) onResize()
        resolve(true)
      })
    })
  }
  const getDebounceInitWHFun = () => {
    debounceInitWHFun = useDebounceFn(initWH, 200)
  }
  const bindDomResizeCallback = () => {
    domObserver = observerDomResize(domHtml!, debounceInitWHFun)

    useEventListener(window, 'resize', debounceInitWHFun)
  }
  const unbindDomResizeCallback = () => {
    if (!domObserver) return

    domObserver.disconnect()
    domObserver.takeRecords()
    domObserver = null
  }

  const autoResizeMixinInit = async () => {
    await initWH(false)

    getDebounceInitWHFun()

    bindDomResizeCallback()

    if (typeof afterAutoResizeMixinInit === 'function')
      afterAutoResizeMixinInit()
  }

  onMounted(() => {
    autoResizeMixinInit()
  })

  onUnmounted(() => {
    unbindDomResizeCallback()
  })

  return {
    width,
    height,
    initWH,
    show,
  }
}
