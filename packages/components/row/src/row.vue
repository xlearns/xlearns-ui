<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";
import { rowProps } from "./row";
import { useNamespace } from "@element3/hooks";
defineOptions({
	name: "ElRow",
});

defineProps({ ...rowProps });

const ns = useNamespace("row");

defineEmits({});

const style = computed(() => {
	const styles: CSSProperties = {};
	return styles;
});
</script>

<template>
	<component :is="tag" :class="ns.b()" :style="style"><slot /></component>
</template>
<style scoped></style>
