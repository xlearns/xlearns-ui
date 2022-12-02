import type { PropType } from 'vue'
import type { TreeProps } from './type'
export const treeProps = {
  data: {
    type: Array as PropType<TreeProps[]>,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
}

export const treeNodeProps = {
  label: {
    type: String,
  },
  expand: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  children: {
    type: Array as PropType<TreeProps[]>,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
}
