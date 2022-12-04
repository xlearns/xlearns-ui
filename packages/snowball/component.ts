import { ElCollapseTransition } from '@snowball/components/collapse-transition'
import { ElScrollboard } from '@snowball/components/scrollboard'
import { ElSvg } from '@snowball/components/svg'
import { ElAlert } from '@snowball/components/alert'
import { ElForm } from '@snowball/components/form'
import { ElTree } from '@snowball/components/tree'
import { ElTable } from '@snowball/components/table'
import { ElAbsoluteLayout } from '@snowball/components/absolute-layout'
import { ElRow } from '@snowball/components/row'
import { ElCol } from '@snowball/components/col'
import { ElGridLayout } from '@snowball/components/grid-layout'
import { ElLayout, ElLayoutItem } from '@snowball/components/layout'
import { ElButton } from '@snowball/components/button'
import { ElScrollbar } from '@snowball/components/scrollbar'
import {
  ElAside,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
} from '@snowball/components/container'

import type { Plugin } from 'vue'

export default [
  ElButton,
  ElScrollbar,
  ElAside,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
  ElGridLayout,
  ElCol,
  ElRow,
  ElLayout,
  ElLayoutItem,
  ElAbsoluteLayout,
  ElTable,
  ElTree,
  ElForm,
  ElAlert,
  ElSvg,
  ElScrollboard,
  ElCollapseTransition,
] as Plugin[]
