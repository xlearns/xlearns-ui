import type { App } from "vue";
import type { SFCWithInstall } from "./types";

export function withInstall<T, E extends Record<string, any>>(
	com: T,
	extra?: E
) {
	(com as SFCWithInstall<T>).install = function (app: App): void {
		for (const comp of [com, ...Object.values(extra ?? {})]) {
			app.component(comp.name, comp);
		}
	};

	if (extra) {
		for (const [key, comp] of Object.entries(extra)) {
			(com as any)[key] = comp;
		}
	}

	return com as SFCWithInstall<T> & E;
}

export const withNoopInstall = <T>(component: T) => {
	(component as SFCWithInstall<T>).install = () => {};
	return component as SFCWithInstall<T>;
};
