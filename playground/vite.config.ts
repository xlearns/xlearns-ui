import "./vite.init";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import { Element3Resolver } from "./resolvers";

export default defineConfig({
	plugins: [
		vue(),
		DefineOptions(),
		Components({
			include: `${__dirname}/**`,
			resolvers: Element3Resolver(),
			dts: false,
		}),
	],
	server: {
		host: true,
	},
});
