<template>
  <div class="vue-container">
    <h1>{{ title }}</h1>
    <el-button @click="showTime">点击查看时间</el-button>
    <div class="time">{{ nowTime }}</div>
    <router-link to="/">go home</router-link>
    <router-link to="/page1">go page1</router-link>
    <router-link to="/page2">go page2</router-link>

    <transition name="slide" enter-class="enter-class" leave-class="leave-class">
        <router-view></router-view>
    </transition>
    
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      title: "我是一个VUE的应用",
      nowTime: "",
    };
  },
  methods: {
    showTime() {
      if (!this.timer) {
        this.nowTime = new Date().toLocaleString();
        this.timer = setInterval(() => {
          this.nowTime = new Date().toLocaleString();
        }, 1000);
      }
    },
  },
  beforeDestroyed() {
    console.log("beforeDestroyed");
    clearInterval(this.timer);
  },
};
</script>


<style lang="scss" scoped>

$color:red;
.vue-container {
  border: 10px solid $color;
  background-color: lightpink;
}


.enter-class {
    background-color: lightcoral;
}
.leave-class {
    background-color: lightgreen;
}
</style>