declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		ElButton: typeof import("./dist/es")["ElButton"];
	}
}

export {};
