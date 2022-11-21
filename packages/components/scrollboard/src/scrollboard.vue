<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useNamespace } from '@element3/hooks'
import { scrollboardProps } from './scrollboard'
import useState from './state'
import type { Options, RowsData } from './type'
defineOptions({
  name: 'ElScrollboard',
})
const props = defineProps({ ...scrollboardProps })
const scrollBoard = ref(null)
const { calcData, stopAnimation, state, sizes, animation, config } =
  useState(scrollBoard)

watch(
  () => props.config,
  () => {
    config.value = props.config
    stopAnimation()
    calcData()
  },
  { deep: true }
)
onMounted(() => {
  config.value = props.config
})
onUnmounted(() => {
  stopAnimation()
})
const emitEvent = defineEmits(['mouseover', 'click'])

function handleClick(
  ri: any,
  ci: number,
  row: RowsData,
  ceil: string[] | string
) {
  const { ceils, rowIndex } = row
  emitEvent('click', {
    row: ceils,
    ceil,
    rowIndex,
    columnIndex: ci,
  })
}

function handleHover(
  enter: boolean,
  ri?: any,
  ci?: number,
  row?: RowsData,
  ceil?: string[] | string
) {
  if (enter) {
    const { ceils, rowIndex } = row as Options<RowsData>
    emitEvent('mouseover', {
      row: ceils,
      ceil,
      rowIndex,
      columnIndex: ci,
    })
  }
  if (!state.mergedConfig.hoverPause) return

  if (enter) stopAnimation()
  else animation(true)
}

const ns = useNamespace('scrollboard')
</script>

<template>
  <div ref="scrollBoard" :class="ns.b()">
    <div
      v-if="state.header.length && state.mergedConfig"
      :class="ns.b('header')"
      :style="`background-color: ${state.mergedConfig.headerBGC};`"
    >
      <div
        v-for="(headerItem, i) in state.header"
        :key="`${headerItem}${i}`"
        :class="ns.b('header-item')"
        :style="`
          height: ${state.mergedConfig.headerHeight}px;
          line-height: ${state.mergedConfig.headerHeight}px;
          width: ${state.widths[i]}px;
        `"
        :align="state.aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="state.mergedConfig && sizes.show"
      :class="ns.b('rows')"
      :style="`height: ${
        sizes.height -
        (state.header.length ? state.mergedConfig.headerHeight : 0)
      }px;`"
    >
      <div
        v-for="(row, ri) in state.rows"
        :key="`${row.toString()}${row.scroll}`"
        :class="ns.b('rows-item')"
        :style="`
          height: ${state.heights[ri]}px;
          line-height: ${state.heights[ri]}px;
          background-color: ${
            state.mergedConfig[
              row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC'
            ]
          };
        `"
      >
        <div
          v-for="(ceil, ci) in row.ceils"
          :key="`${ceil}${ri}${ci}`"
          :class="ns.b('ceil')"
          :style="`width: ${state.widths[ci]}px;`"
          :align="state.aligns[ci]"
          @click="handleClick(ri, ci, row, ceil)"
          @mouseenter="handleHover(true, ri, ci, row, ceil)"
          @mouseleave="handleHover(false)"
          v-html="ceil"
        />
      </div>
    </div>
  </div>
</template>
