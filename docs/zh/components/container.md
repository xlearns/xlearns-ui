---
title: Container
lang: en-US
---

# Container 按钮

常用容器

## 基础用法

:::demo 使用`width`、`height`属性来定义 Container 的样式。

```vue
<template>
  <div class="content">
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
