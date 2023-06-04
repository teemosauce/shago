<template>
  <div>
    <h1>Vue3 Platform App</h1>
    <div>
      <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </el-row>
    </div>

    <u-button @click="handleClick">我是共享的组件</u-button>
  </div>
</template>

<script setup>

import UButton from "@captain/components-vue3/button/index.vue";
import { getMessage } from "../../../shared/utils/index";
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
function handleClick() {
  ElMessage(getMessage());
}
</script>

<style scoped>
</style>