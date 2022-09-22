<script setup lang="ts">
import { useNamespace } from "@element3/hooks";

defineOptions({
	name: "ElContainer",
});

defineProps({
	direction: {
		type: String,
	},
});
const ns = useNamespace("container");
</script>
<template>
	<section :class="[ns.b()]">
		<slot />
	</section>
</template>

<style scoped></style>
