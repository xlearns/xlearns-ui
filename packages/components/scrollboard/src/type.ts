type Carousel = 'single' | 'page'

export interface Attrs {
  header: string[]
  data: string[][]
  headerBGC: string
  waitTime: number
  columnWidth: number[]
  align: number[]
  rowNum: number
  index: boolean
  indexHeader: string
  headerHeight: number
  carousel: Carousel
}

type RowsData = { ceils: [] }

export interface State {
  defaultConfig: Attrs
  mergedConfig: Attrs
  header: string[]
  avgHeight: number
  heights: number[]
  widths: number[]
  rowsData: RowsData[]
  aligns: number[]
  needCalc: boolean
  updater: number
  animationIndex: number
  animationHandler: NodeJS.Timeout | null
  rows: RowsData[]
}

export type SizesAttr = number
export interface Sizes {
  width: SizesAttr
  height: SizesAttr
}
