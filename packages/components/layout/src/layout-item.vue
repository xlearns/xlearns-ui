<script setup lang="ts">
import { useNamespace } from "@element3/hooks";
defineOptions({
	name: "ElLayoutItem",
});
defineProps({
	options: {
		type: Object,
		default: {},
	},
});
defineEmits({});
const ns = useNamespace("LayoutItem");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
