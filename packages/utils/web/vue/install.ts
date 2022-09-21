import type { App } from "vue";

export function withInstall(
	com: Record<string, any>,
	extra?: Record<string, any>
) {
	com.install = function (app: App) {
		for (const comp of [com, ...Object.values(extra ?? {})]) {
			app.component(comp.name, comp);
		}
	};

	if (extra) {
		for (const [key, comp] of Object.entries(extra)) {
			(com as any)[key] = comp;
		}
	}

	return com;
}
