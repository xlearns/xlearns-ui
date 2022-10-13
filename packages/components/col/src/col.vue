
<script setup lang="ts">
import { colProps } from "./col";
import { useNamespace } from "@element3/hooks";
	defineOptions({
		name: "ElCol",
	});
	defineProps({ ...colProps });
	defineEmits({});
	const ns = useNamespace("col");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
	
