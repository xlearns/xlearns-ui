declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		ElButton: typeof import("./packages/element3")["ElButton"];
	}
}

export {};
