<template>
  <button @click="handleClick" class="u-button">
    <span><slot></slot></span>
  </button>
</template>
<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["click"]);
function handleClick(e) {
  emit("click", e);
}
</script>

<style lang="scss" scoped>
.u-button {
  background-color: red;
  color: aliceblue;
  font-weight: bold;
  padding: 20px 40px;
}
</style>