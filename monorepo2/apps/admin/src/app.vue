<template>
  <div>
    <h1>Vue2 Admin App!</h1>
    <div>
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
    </div>

    <u-button @click="handleClick">我是共享的组件</u-button>

    <el-input v-model="number1" placeholder="数字1" type="number"></el-input>
    +
    <el-input v-model="number2" placeholder="数字2" type="number"></el-input>
    =
    <span>{{ total }}</span>
  </div>
</template>

<script>
import UButton from "@captain/components-vue2/button/index.vue";
import { getMessage } from "../../../shared/utils/index";
import Ravage from "../../../shared/libs/ravage";

import { add } from '@captain/math'

export default {
  components: {
    UButton,
  },
  data() {
    return {
      number1: 0,
      number2: 0,
    };
  },

  computed: {
    total() {
      return add(parseFloat(this.number1), parseFloat(this.number2))
    },
  },
  methods: {
    handleClick() {
      this.$message(getMessage());

      let ravage = new Ravage("波士顿机器狗", "黑色");
      ravage.crawl();
      console.log(ravage.toString());
    },
  },
};
</script>

<style scoped>
</style>