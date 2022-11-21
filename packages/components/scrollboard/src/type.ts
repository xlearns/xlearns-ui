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
  evenRowBGC: string
  oddRowBGC: string
  hoverPause: boolean
}

export type RowsData = { ceils: string[]; scroll?: number; rowIndex: number }

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
  initWH?: any
  show?: boolean
}

export type Options<T> = {
  [P in keyof T]?: T[P]
}
