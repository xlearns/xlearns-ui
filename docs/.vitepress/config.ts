import { sidebar, nav } from "./config/index";

const config = {
  title: "🚀  Element3",
  description: "a Vue 3 based component library for designers and developers",
  themeConfig: {
    logo: "/images/vite.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022  xlearns contributors",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xlearns" }],
    nav,
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
