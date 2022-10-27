import Theme from "vitepress/theme";
import Element3 from "snowball-ui";
import "@element3/theme-chalk/src/index.scss";

// 主题样式
import "vitepress-theme-demoblock/theme/styles/index.css";
// 插件的组件，主要是demo组件
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

import "./style.css";

export default {
  ...Theme,
  enhanceApp: ({ app }) => {
    app.use(Element3);
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  },
};
