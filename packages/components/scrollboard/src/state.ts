import { reactive, ref } from 'vue'
import { autoResize, deepClone, deepMerge } from '@element3/utils'

interface Attrs {
  header: string[]
  data: string[][]
  headerBGC: string
  waitTime: number
  columnWidth: number[]
  rowNum: number
  index: boolean
  indexHeader: string
  headerHeight: number
}

type RowsData = { ceils: [] }

interface State {
  defaultConfig: Attrs
  mergedConfig: Attrs
  header: string[]
  avgHeight: number
  heights: number[]
  widths: number[]
  rowsData: RowsData[]
}

const sizes = ref()

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
  },
  mergedConfig: {} as Attrs,
  header: [],
  avgHeight: 0,
  heights: [],
  widths: [],
  rowsData: [],
})
function mergeConfig(config: any = {}) {
  state.mergedConfig = deepMerge(deepClone(state.defaultConfig, true), config)
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
  const { data } = state.mergedConfig
  const { index, headerBGC } = state.mergedConfig
  if (index) {
    data.map((row, i) => {
      row = [...row]

      const indexTag = `<span class="index" style="background-color: ${headerBGC};">${
        i + 1
      }</span>`

      row.unshift(indexTag)

      return row
    })
  }
}

function calcHeights(onresize = false) {
  const { headerHeight, rowNum, data } = state.mergedConfig
  let allHeight = sizes.value.height.value
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

  const avgWidth =
    (sizes.value.width.value - usedWidth) / (columnNum - columnWidth.length)

  const widths = new Array(columnNum).fill(avgWidth)

  state.widths = deepMerge(widths, columnWidth)
}

export default function useState(dom: any) {
  const _ = autoResize(dom)
  sizes.value = _
  return {
    mergeConfig,
    state,
    calcHeaderData,
    calcHeights,
    calcRowsData,
    calcWidths,
  }
}
