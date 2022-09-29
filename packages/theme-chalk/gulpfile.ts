import { dest, parallel, series, src } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
// css压缩
// import clearCss from "gulp-clean-css";
import path from "path";
import { epOutput } from "@element3/build";
import { copyFile, mkdir } from "fs/promises";

// console美化
// import consola from "consola";

// 文件重命名
// import rename from "gulp-rename";
const distFolder = path.resolve(__dirname, "dist");
const distBundle = path.resolve(epOutput, "theme-chalk");

function buildThemeChalk() {
	const sass = gulpSass(dartSass);
	const res = src(path.resolve(__dirname, "src/*.scss"))
		.pipe(sass.sync())
		.pipe(autoprefixer({ cascade: false }))
		.pipe(dest(distFolder));
	return res;
}

export function copyThemeChalkBundle() {
	return src(`${distFolder}/**`).pipe(dest(distBundle));
}
export const copyFullStyle = async () => {
	await mkdir(path.resolve(epOutput, "dist"), { recursive: true });
	await copyFile(
		path.resolve(epOutput, "theme-chalk/index.css"),
		path.resolve(epOutput, "dist/index.css")
	);
};

export const build = parallel(
	series(buildThemeChalk, copyThemeChalkBundle, copyFullStyle)
);
export default build;
