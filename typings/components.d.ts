import "@vue/runtime-core";

declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		ElButton: typeof import("../packages/element3")["ElButton"];
		ElScrollbar: typeof import("../packages/element3")["ElScrollbar"];
		ElContainer: typeof import("../packages/element3")["ElContainer"];
		ElHeader: typeof import("../packages/element3")["ElHeader"];
		ElAside: typeof import("../packages/element3")["ElAside"];
		ElMain: typeof import("../packages/element3")["ElMain"];
		ElFooter: typeof import("../packages/element3")["ElFooter"];
	}
}

export {};
