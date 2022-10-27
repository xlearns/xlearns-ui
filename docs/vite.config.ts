import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import DefineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
	plugins: [vueJsx(), DefineOptions()],
});
