import { copy } from "fs-extra";
import path from "path";
import { epOutput } from "./paths";
import { buildConfig } from "./info";
import type { Module } from "./info";

async function copyTypesDefinitions() {
	const src = path.resolve(epOutput, "types", "packages");
	const copyTypes = (module: Module) => {
		copy(src, buildConfig[module].output.path, { recursive: true });
	};
	copyTypes("esm");
	copyTypes("cjs");
}

export default copyTypesDefinitions;
