---
title: Scrollboard
---

# Scrollboard

常用无限滚动

## 基础用法

基础的函数用法

:::demo 使用`size`、`color`、`pain`、`round`属性来定义 Scrollboard 的样式。

```vue
<script setup lang="ts">
import { ref } from 'vue'
const config = ref({
  header: ['列1', '列2', '列3'],
  data: [
    ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
    ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
    ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
    ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3'],
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
  // waitTime: 500,
})
</script>
<template>
  <ElScrollboard :config="config" style="width:100%;height:300px;" />
</template>
```

:::

## Alert API

### Attributes

| Name        | Description                              | Type                                                  | Default   | Required |
| ----------- | ---------------------------------------- | ----------------------------------------------------- | --------- | -------- |
| title       | alert title.                             | ^[string]                                             | —         | No       |
| type        | alert type.                              | ^[enum]`'success' \| 'warning' \| 'info' \| 'error' ` | `info`    | No       |
| description | descriptive text.                        | ^[string]                                             | —         | No       |
| closable    | whether alert can be dismissed.          | ^[boolean]                                            | `true`    | No       |
| center      | whether content is placed in the center. | ^[boolean]                                            | `false`   | No       |
| close-text  | customized close button text.            | ^[string]                                             | —         | No       |
| show-icon   | whether a type icon is displayed.        | ^[boolean]                                            | `false`   | No       |
| effect      | theme style.                             | ^[enum]`'light' \| 'dark'`                            | `'light'` | No       |
