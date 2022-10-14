<script setup lang="ts">
import { useNamespace } from "@element3/hooks";
import { computed } from "vue";

defineOptions({
	name: "ElLayout",
});

defineProps({
	width: {
		type: String,
		default: "1920",
	},
	height: {
		type: String,
		default: "1080",
	},
});

defineEmits({});

const ns = useNamespace("layout");

const style = computed(() => {
	return {
		// width: props.width,
		// height: props.height,
	};
});
</script>

<template>
	<div :class="ns.b()" :style="style"><slot /></div>
</template>
<style scoped></style>
