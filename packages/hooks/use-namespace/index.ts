const namespace = "el";
const statePrefix = "is-";

const _bem = (
	namespace: string,
	block: string,
	blockSuffix: string,
	element: string,
	modifier: string
) => {
	let cls = `${namespace}-${block}`;
	if (blockSuffix) {
		cls += `-${blockSuffix}`;
	}
	if (element) {
		cls += `__${element}`;
	}
	if (modifier) {
		cls += `--${modifier}`;
	}
	return cls;
};

export const useNamespace = (block: string) => {
	const b = (blockSuffix = "") => _bem(namespace, block, blockSuffix, "", "");
	const e = (element?: string) =>
		element ? _bem(namespace, block, "", element, "") : "";
	const m = (modifier?: string) =>
		modifier ? _bem(namespace, block, "", "", modifier) : "";
	const is = (name: string, ...args: [boolean | undefined] | []) => {
		const state = args.length >= 1 ? args[0]! : true;
		return name && state ? `${statePrefix}${name}` : "";
	};

	const cssVarBlock = (object: Record<string, string>) => {
		const styles: Record<string, string> = {};
		for (const key in object) {
			if (object[key]) {
				styles[`--${namespace}-${block}-${key}`] = object[key];
			}
		}
		return styles;
	};

	return { b, e, m, is, cssVarBlock };
};
