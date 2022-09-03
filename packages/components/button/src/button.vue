<script setup lang="ts">
import { useSlots, ref, onMounted } from "vue";
import { buttonProps, buttonEmits } from "./button";
import { useNamespace } from "@element3/hooks";
defineOptions({
  name: "ElButton",
});
const ns = useNamespace("button");
const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);
const slots = useSlots();
const _ref = ref<HTMLButtonElement>();
const _type = props.type || "";

function test() {
  return;
  console.log(slots.default?.(), emit);
}
onMounted(() => {
  test();
});
defineExpose({ ref: _ref, type: _type });
</script>

<template>
  <button :class="[ns.b(), ns.m(_type), ns.is('plain', plain)]" ref="_ref">
    <slot />
  </button>
</template>

<style scoped></style>
