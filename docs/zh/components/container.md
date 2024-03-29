---
title: Container
---

# Container

常用容器

## 基础用法

:::demo 使用`width`、`height`属性来定义 Container 的样式。

```vue
<template>
  <div class="content" style="height:300px">
    <ElContainer style="height: 100%">
      <ElHeader>Header</ElHeader>
      <ElContainer>
        <ElAside width="200px">Aside</ElAside>
        <ElMain> Main </ElMain>
      </ElContainer>
      <ElFooter>Footer</ElFooter>
    </ElContainer>
  </div>
</template>
```

:::

## Container API

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
