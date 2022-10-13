import { ElRow } from "@element3/components/row";import { ElCol } from "@element3/components/col";import { ElGridLayout } from "@element3/components/grid-layout";
import { ElLayout } from "@element3/components/layout";
import { ElButton } from "@element3/components/button";
import { ElScrollbar } from "@element3/components/scrollbar";
import type { Plugin } from "vue";

import {
  ElAside,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
} from "@element3/components/container";

export default [
  ElButton,
  ElScrollbar,
  ElAside,
  ElContainer,
  ElFooter,
  ElHeader,
  ElMain,
  ElLayout,
  ElGridLayout,
,ElCol,ElRow] as Plugin[];


