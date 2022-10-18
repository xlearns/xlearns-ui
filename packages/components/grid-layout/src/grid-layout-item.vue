<script setup lang="ts">
import { computed } from "vue";
import { useNamespace } from "@element3/hooks";

defineOptions({
	name: "ElGridLayoutItem",
});

const props = defineProps({
	name: {
		type: String,
		default: "",
	},
});

defineEmits({});

const ns = useNamespace("grid-layout-item");

const style = computed(() => {
	return {
		"grid-area": props.name,
	};
});
</script>

<template>
	<div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
