<script setup lang="ts">
import { colProps } from "./col";
import { useNamespace } from "@element3/hooks";
import { computed } from "vue";

defineOptions({
	name: "ElCol",
});

const props = defineProps({ ...colProps });

defineEmits({});

const ns = useNamespace("col");

const classes = computed(() => {
	const classes: string[] = [];
	const pos = ["span", "offset", "pull", "push"] as const;

	pos.forEach((prop) => {
		if (prop == "span") {
			classes.push(ns.b(`${props[prop]}`));
		} else {
			classes.push(ns.b(`${prop}-${props[prop]}`));
		}
	});
	return classes;
});
</script>

<template>
	<component :is="tag" :class="[ns.b(), classes]"><slot /></component>
</template>
<style scoped></style>
