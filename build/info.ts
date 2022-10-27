import path from "path";
import { epOutput } from "./paths";

export type Module = "esm" | "cjs";

// export const PKG_NAME = "element3";

export const PKG_NAME = "..";

export const PKG_PREFIX = "@element3";

export const buildConfig = {
	esm: {
		output: {
			name: "es",
			path: path.resolve(epOutput, "es"),
		},
		bundle: {
			path: `${PKG_NAME}/es`,
		},
	},
	cjs: {
		output: {
			name: "lib",
			path: path.resolve(epOutput, "lib"),
		},
		bundle: {
			path: `${PKG_NAME}/lib`,
		},
	},
};
