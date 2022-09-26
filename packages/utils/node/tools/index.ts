
// 全大写命名
export function toCapitalCase(value: string) {
	return (
		value.charAt(0).toUpperCase() +
		value
			.slice(1)
			.replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ""))
	);
}

// 驼峰命名
export function toCamelCase(value: string) {
	const capitalName = toCapitalCase(value);

	return capitalName.charAt(0).toLowerCase() + capitalName.slice(1);
}

// 短横线命名
export function toKebabCase(value: string) {
	return (
		value.charAt(0).toLowerCase() +
		value
			.slice(1)
			.replace(/([A-Z])/g, "-$1")
			.toLowerCase()
	);
}

