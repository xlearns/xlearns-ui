export interface TreeProps {
  label?: string
  expand?: boolean
  checked?: boolean
  children?: TreeProps[]
}

export interface TreeNode {
  data: TreeProps
}

export interface State {
  data: TreeProps[]
}
