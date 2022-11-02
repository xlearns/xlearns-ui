import { ElAlert } from "@element3/components/alert";import { ElForm } from '@element3/components/form'
import { ElTree } from '@element3/components/tree'
import { ElTable } from '@element3/components/table'
import { ElAbsoluteLayout } from '@element3/components/absolute-layout'
import { ElRow } from '@element3/components/row'
import { ElCol } from '@element3/components/col'
import { ElGridLayout } from '@element3/components/grid-layout'
import { ElLayout, ElLayoutItem } from '@element3/components/layout'
import { ElButton } from '@element3/components/button'
import { ElScrollbar } from '@element3/components/scrollbar'
import {
  ElAside,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
} from '@element3/components/container'

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
ElAlert] as Plugin[]

