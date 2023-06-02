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

    <u-button>我是共享的组件</u-button>
  </div>
</template>

<script>
import UButton from '@all/shared/components/button/index.vue'
export default {
    components: {
        UButton
    }
};
</script>

<style scoped>
</style>