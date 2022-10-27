<template>
  <div class="content">
    <ElContainer style="height: 100%">
      <ElHeader>Header</ElHeader>
      <ElContainer>
        <ElAside width="200px">Aside</ElAside>
        <ElMain>
          <ElButton>hello world</ElButton>
        </ElMain>
      </ElContainer>
      <ElFooter>Footer</ElFooter>
    </ElContainer>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: #000;
}
.content .el-header,
.content .el-footer {
  background-color: #213d5b;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content .el-aside {
  background-color: #1d3043;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content .el-main {
  background-color: #18222c;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
