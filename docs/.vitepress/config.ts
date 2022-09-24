const sidebar = {
  "/": [
    { text: "快速开始", link: "/" },
    {
      text: "通用",
      children: [
        { text: "Button 按钮", link: "/components/button/" },
        { text: "Container 容器", link: "/components/container/" },
      ],
    },
  ],
};
const config = {
  title: "🚀  Element3",
  description: "Element3",
  themeConfig: {
    sidebar,
  },
  markdown: {
    config: (md) => {
      // 添加DemoBlock插槽
      const { demoBlockPlugin } = require("vitepress-theme-demoblock");
      md.use(demoBlockPlugin);
    },
  },
};
export default config;
