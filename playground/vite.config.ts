import "./vite.init";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), DefineOptions()],
	server:{
		host:true
	}
});
