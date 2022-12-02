export interface TreeProps {
  label: string
  expand?: boolean
  checked?: boolean
  children?: TreeProps[]
}

export interface State {
  data: TreeProps[]
}
