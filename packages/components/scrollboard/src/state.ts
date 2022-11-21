import { reactive, ref } from 'vue'
import { autoResize, deepClone, deepMerge } from '@element3/utils'
import type { Attrs, RowsData, Sizes, State } from './type'

const sizes: Sizes = reactive<Sizes>({
  width: 0,
  height: 0,
  show: false,
})
const config = ref({})
const state = reactive<State>({
  defaultConfig: {
    header: [],
    data: [],
    headerBGC: '#00BAFF',
    waitTime: 2000,
    columnWidth: [],
    rowNum: 5,
    index: false,
    indexHeader: '#',
    headerHeight: 35,
    align: [],
    carousel: 'single',
    evenRowBGC: '#0A2732',
    oddRowBGC: '#003B51',
    hoverPause: true,
  },
  mergedConfig: {} as Attrs,
  header: [],
  avgHeight: 0,
  heights: [],
  widths: [],
  rowsData: [],
  aligns: [],
  needCalc: false,
  updater: 0,
  animationIndex: 0,
  animationHandler: null,
  rows: [],
})

function mergeConfig() {
  state.mergedConfig = deepMerge(
    deepClone(state.defaultConfig, true),
    config.value
  )
}

function calcHeaderData() {
  let { header } = state.mergedConfig
  const { index, indexHeader } = state.mergedConfig
  if (!header.length) {
    header = []
    return
  }
  header = [...header]
  if (index) header.unshift(indexHeader)
  state.header = header
}

function calcRowsData() {
  let { data }: { data: string[][] | RowsData[] } = state.mergedConfig
  const { index, headerBGC, rowNum } = state.mergedConfig
  if (index) {
    data = data.map((row, i) => {
      row = [...row]
      const indexTag = `<span class="index" style="background-color: ${headerBGC};">${
        i + 1
      }</span>`
      row.unshift(indexTag)
      return row
    })
  }
  data = data.map((ceils, i) => ({ ceils, rowIndex: i }))
  const rowLength = data.length
  if (rowLength > rowNum && rowLength < 2 * rowNum) data = [...data, ...data]
  data = data.map((d, i) => ({ ...d, scroll: i }))
  state.rowsData = data
  state.rows = data
}

function calcHeights(onresize = false) {
  const { headerHeight, rowNum, data } = state.mergedConfig
  let allHeight = sizes.height
  if (state.header.length) allHeight -= headerHeight
  const avgHeight = allHeight / rowNum
  state.avgHeight = avgHeight

  if (!onresize) state.heights = new Array(data.length).fill(avgHeight)
}

function calcWidths() {
  const { columnWidth, header } = state.mergedConfig

  const usedWidth = columnWidth.reduce((all, w) => all + w, 0)

  let columnNum = 0
  if (state.rowsData[0]) columnNum = state.rowsData[0].ceils.length
  else if (header.length) columnNum = header.length

  const avgWidth = (sizes.width - usedWidth) / (columnNum - columnWidth.length)

  const widths = new Array(columnNum).fill(avgWidth)

  state.widths = deepMerge(widths, columnWidth)
}

function calcAligns() {
  const columnNum = state.header.length

  const aligns = new Array(columnNum).fill('left')

  const { align } = state.mergedConfig

  state.aligns = deepMerge(aligns, align)
}

async function animation(start = false) {
  if (state.needCalc) {
    calcRowsData()
    calcHeights()
    state.needCalc = false
  }

  const { waitTime, carousel, rowNum } = state.mergedConfig
  const { updater } = state

  const rowLength = state.rowsData.length

  if (rowNum >= rowLength) return

  if (start) await new Promise((resolve) => setTimeout(resolve, waitTime))
  if (updater !== state.updater) return

  const animationNum = carousel === 'single' ? 1 : rowNum

  const rows = state.rowsData.slice(state.animationIndex)
  rows.push(...state.rowsData.slice(0, state.animationIndex))

  state.rows = rows.slice(0, carousel === 'page' ? rowNum * 2 : rowNum + 1)
  state.heights = new Array(rowLength).fill(state.avgHeight)

  await new Promise((resolve) => setTimeout(resolve, 300))
  if (updater !== state.updater) return

  state.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))

  state.animationIndex += animationNum

  const back = state.animationIndex - rowLength
  if (back >= 0) state.animationIndex = back

  // state.animationIndex = animationIndex
  state.animationHandler = setTimeout(animation, waitTime - 300)
}

function stopAnimation() {
  state.updater = (state.updater + 1) % 999999
  if (!state.animationHandler) return
  clearTimeout(state.animationHandler)
}

function calcData() {
  mergeConfig()
  calcHeaderData()
  calcRowsData()
  calcWidths()
  calcHeights()
  calcAligns()
  animation(true)
}

function onResize() {
  if (!state.mergedConfig) return
  calcWidths()
  calcHeights()
}

export default function useState(dom: any) {
  const _autoResizeConst = autoResize(dom, onResize, () => {
    calcData()
  })
  Object.entries(sizes).forEach(([k]) => {
    const key = k as keyof typeof _autoResizeConst
    sizes[key] = _autoResizeConst[key] as unknown as number
  })

  return {
    calcData,
    animation,
    calcAligns,
    mergeConfig,
    state,
    config,
    calcHeaderData,
    calcHeights,
    calcRowsData,
    calcWidths,
    stopAnimation,
    sizes,
  }
}
