import { withInstall, withNoopInstall } from '@element3/utils'
import AbsoluteLayoutItem from './src/absolute-layout-item.vue'
import AbsoluteLayout from './src/absolute-layout.vue'

export const ElAbsoluteLayout = withInstall(AbsoluteLayout, {
  AbsoluteLayoutItem,
})
export const ElAbsoluteLayoutItem = withNoopInstall(AbsoluteLayoutItem)

export default ElAbsoluteLayout
