
<script setup lang="ts">
import { grid-layoutProps } from "./grid-layout";
import { useNamespace } from "@element3/hooks";
	defineOptions({
		name: "ElGridLayout",
	});
	defineProps({ ...grid-layoutProps });
	defineEmits({});
	const ns = useNamespace("grid-layout");
</script>

<template>
	<div :class="ns.b()"><slot /></div>
</template>
<style scoped></style>
	
