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
  data: {
    type: Object as PropType<TreeProps>,
    default: () => ({}),
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
}
