import { copy } from "fs-extra";
import consola from "consola";
import path from "path";
import { epOutput } from "./paths";

type Module = "esm" | "cjs";

const buildConfig = {
	esm: {
		output: {
			name: "es",
			path: path.resolve(epOutput, "es"),
		},
	},
	cjs: {
		output: {
			name: "es",
			path: path.resolve(epOutput, "es"),
		},
	},
};
async function copyTypesDefinitions() {
	const src = path.resolve(epOutput, "types", "packages");
	const copyTypes = (module: Module) => {
		copy(src, buildConfig[module].output.path, { recursive: true });
	};
	copyTypes("esm");
	copyTypes("cjs");
}

export default copyTypesDefinitions;
