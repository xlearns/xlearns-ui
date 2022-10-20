<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useNamespace } from "@element3/hooks";

const areas = ref();
const columns = ref();
const rows = ref();
const gap = ref();

type Target = {
	[x: string]: any;
	lg?: { value: number; areas: string | never[] };
	md?: { value: number; areas: string | never[] };
	sm?: { value: number; areas: string | never[] };
	xs?: { value: number; areas: string | never[] };
	xl?: { value: number; areas: string | never[] };
};

const breakpoint = {
	lg: {
		value: 1200,
		areas: [],
		columns: "",
		rows: "",
		gap: "",
	},
	md: {
		value: 992,
		areas: [],
		columns: "",
		rows: "",
		gap: "",
	},
	sm: {
		value: 768,
		areas: [],
		columns: "",
		rows: "",
		gap: "",
	},
	xs: {
		value: 480,
		areas: [],
		columns: "",
		rows: "",
		gap: "",
	},
	xl: {
		value: 1920,
		areas: [],
		columns: "",
		rows: "",
		gap: "",
	},
};

const _config = ref();

defineOptions({
	name: "ElGridLayout",
});

const props = defineProps({
	reactive: {
		type: Object,
		default: () => {
			return [];
		},
	},
	columns: {
		type: String,
		default: "1fr",
	},
	rows: {
		type: String,
		default: "1fr",
	},
	areas: {
		type: Object,
		default: () => {
			return [];
		},
	},
	gap: {
		type: String,
		default: "",
	},
	height: {
		type: String,
		default: "100%",
	},
});

defineEmits({});

const ns = useNamespace("grid-layout");

const style = computed(() => {
	return {
		"grid-template-columns": columns.value,
		"grid-template-rows": rows.value,
		"grid-template-areas": areas.value,
		"grid-gap": gap.value,
		height: props.height,
	};
});

function extend(target: Target, ...args: Record<string, any>[]) {
	for (let i = 0; i < args.length; ++i) {
		let from = args[i];
		if (typeof from !== "object") continue;
		for (let j in from) {
			if (from.hasOwnProperty(j)) {
				target[j] = Array.isArray(from[j])
					? extend([], target[j], from[j])
					: typeof from[j] === "object"
					? extend({}, target[j], from[j])
					: from[j];
			}
		}
	}
	return target;
}
function init() {
	_config.value = extend(breakpoint, props.reactive);
}
onMounted(() => {
	init();
	getAreas();
});

function areasTransform(data: string[][]) {
	let res = "";
	if (Array.isArray(data)) {
		data.forEach((_s) => {
			if (Array.isArray(_s)) {
				res += `"${_s.join(" ")}"\n`;
			}
		});
	}
	return res;
}

// TODO: Not elegant enough rewrite!!
function getAreas() {
	const sizes = ["xs", "sm", "md", "lg", "xl"];
	const _w = window.innerWidth;
	for (let i = 0; i < sizes.length; i++) {
		const cur = _config.value[sizes[i]];
		const pre = _config.value[sizes[i - 1]];
		if (!cur) return;
		if (!pre && _w <= cur.value) {
			setGridAttributes(cur);
		} else if (_w <= cur.value && _w > pre.value) {
			setGridAttributes(cur);
		}
	}
}
function setGridAttributes(res: { [x: string]: string[][] }) {
	Object.entries({
		columns: columns,
		rows: rows,
		gap: gap,
		areas: areas,
	}).forEach(([key, val]) => {
		if (key != "areas") {
			val.value = res[key] || (props as Record<string, any>)[key] || "";
		} else {
			val.value =
				res[key] && res[key].length > 0
					? areasTransform(res[key])
					: areasTransform(props[key] as string[][]) || "";
		}
	});
}
window.addEventListener("resize", () => {
	getAreas();
});
</script>

<template>
	<div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
