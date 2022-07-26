import { existsSync, readFileSync, writeFileSync } from "fs";
// 初始化
const app = "src/App.vue";
const example = "app.example.vue";

if (!existsSync(app)) {
	// 向src/App.vue写入example的内容
	writeFileSync(app, readFileSync(example));
}
