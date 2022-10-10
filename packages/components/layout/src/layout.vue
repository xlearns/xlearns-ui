
<script setup lang="ts">
import { layoutProps } from "./layout";
import { useNamespace } from "@element3/hooks";
	defineOptions({
		name: "ElLayout",
	});
	defineProps({ ...layoutProps });
	defineEmits({});
	const ns = useNamespace("layout");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
	
