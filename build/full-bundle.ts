import path from "path";
import { promises as fs } from "fs";
import DefineOptions from "unplugin-vue-define-options/vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import * as rollup from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import { epRoot, buildOutput } from "./paths";
import dts from "vite-plugin-dts";

const sourceMap = process.env.SOURCE_MAP === "true";

const umd = {
	format: "umd",
	file: path.resolve(buildOutput, "element3/dist/index.js"),
	exports: "named",
	name: "Element3",
	globals: {
		vue: "Vue",
	},
};

const umdMinified = {
	...umd,
	file: path.resolve(buildOutput, "element3/dist/index.full.js"),
};

(async () => {
	const config = {
		input: path.resolve(epRoot, "./index.ts"),
		plugins: [
			nodeResolve(),
			DefineOptions(),
			vue({
				target: "browser",
				exposeFilename: false,
			}),
			commonjs(),
			esbuild({
				minify: false,
			}),
			// dts({
			// 	exclude: ["node_modules", "playground"],
			// 	outputDir: ["lib", "es"],
			// 	compilerOptions: { sourceMap },
			// 	copyDtsFiles: false,
			// }),
		],
		external: ["vue"],
	};

	const bundle = await rollup.rollup({
		...config,
		plugins: [...config.plugins, entryPlugin()],
	});

	await bundle.write(umdMinified as any);

	const entryFiles = await fs.readdir(epRoot, { withFileTypes: true });
	const entryPoints = entryFiles
		.filter((f) => f.isFile())
		.filter((f) => {
			return f.name !== "package.json" && f.name !== "README.md";
		})
		.map((f) => path.resolve(epRoot, f.name));

	const entryBundle = await rollup.rollup({
		...config,
		input: entryPoints,
		external: (_) => true,
	});

	await entryBundle.write({
		format: "cjs",
		dir: path.resolve(buildOutput, "element3/lib"),
		exports: "named",
	});

	await entryBundle.write({
		format: "esm",
		dir: path.resolve(buildOutput, "element3/es"),
	});
})();

function entryPlugin() {
	return {
		name: "element3-entry-plugin",
		transform(code, id) {
			if (id.includes("packages")) {
				return {
					code: code
						.replace(
							/@element3\/(components|directives|utils|hooks|tokens|locale)/g,
							`${path.relative(
								path.dirname(id),
								path.resolve(__dirname, "../packages")
							)}/$1`
						)
						.replace(/\\/g, "/"),
					map: null,
				};
			}

			return { code, map: null };
		},
	};
}
