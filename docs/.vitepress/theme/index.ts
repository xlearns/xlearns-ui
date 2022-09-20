import Theme from "vitepress/dist/client/theme-default";

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
		app.component("Demo", Demo);
		app.component("DemoBlock", DemoBlock);
		app.use(Element3);
	},
};
