
<script setup lang="ts">
import { rowProps } from "./row";
import { useNamespace } from "@element3/hooks";
	defineOptions({
		name: "ElRow",
	});
	defineProps({ ...rowProps });
	defineEmits({});
	const ns = useNamespace("row");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
	
