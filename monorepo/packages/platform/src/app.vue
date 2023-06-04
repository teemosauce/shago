<template>
  <div>
    <h1>Platform App</h1>
    <div>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <br /><br />
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </div>

    <u-button @click="handleClick">我是共享的组件</u-button>
  </div>
</template>

<script>
import UButton from '@all/shared/components/button/index.vue'
import { getMessage } from '@all/shared/utils/index'
export default {
    components: {
        UButton
    },
    methods: {
        handleClick() {
            this.$Message.info(getMessage())
        }
    }
};
</script>

<style scoped>
</style>