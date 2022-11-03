declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AbsoluteLayout: typeof import('./dist/es')['ElAbsoluteLayout']
    Alert: typeof import('./dist/es')['ElAlert']
    Button: typeof import('./dist/es')['ElButton']
    Col: typeof import('./dist/es')['ElCol']
    Container: typeof import('./dist/es')['ElContainer']
    Form: typeof import('./dist/es')['ElForm']
    GridLayout: typeof import('./dist/es')['ElGridLayout']
    Layout: typeof import('./dist/es')['ElLayout']
    Row: typeof import('./dist/es')['ElRow']
    Scrollbar: typeof import('./dist/es')['ElScrollbar']
    Svg: typeof import('./dist/es')['ElSvg']
    Table: typeof import('./dist/es')['ElTable']
    Tree: typeof import('./dist/es')['ElTree']
  }
}

export {}
