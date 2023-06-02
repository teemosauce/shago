<template>
  <button @click="handleClick">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
  
<script>
export default {
  name: "UButton",
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
  
  <style scoped>
button {
  background-color: red;
  color: aliceblue;
  font-weight: bold;
  padding: 20px 40px;
}
</style>