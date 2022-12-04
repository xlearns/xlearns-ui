import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElCollapseTransition: typeof import('../packages/snowball')['ElCollapseTransition']
    ElButton: typeof import('../packages/snowball')['ElButton']
    ElScrollbar: typeof import('../packages/snowball')['ElScrollbar']
    ElContainer: typeof import('../packages/snowball')['ElContainer']
    ElHeader: typeof import('../packages/snowball')['ElHeader']
    ElAside: typeof import('../packages/snowball')['ElAside']
    ElMain: typeof import('../packages/snowball')['ElMain']
    ElFooter: typeof import('../packages/snowball')['ElFooter']
    ElCol: typeof import('../packages/snowball')['ElCol']
    ElRow: typeof import('../packages/snowball')['ElRow']
    ElScrollboard: typeof import('../packages/snowball')['ElScrollboard']
    ElTree: typeof import('../packages/snowball')['ElTree']
  }
}

export {}
