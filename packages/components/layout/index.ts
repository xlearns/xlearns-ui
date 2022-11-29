import { withInstall, withNoopInstall } from '@snowball/utils'
import LayoutItem from './src/layout-item.vue'
import Layout from './src/layout.vue'

export const ElLayout = withInstall(Layout, { LayoutItem })
export const ElLayoutItem = withNoopInstall(LayoutItem)

export default ElLayout
