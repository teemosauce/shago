<template>
  <div class="vue-container">
    <h1>{{ title }}</h1>
    <el-button @click="showTime">点击查看时间</el-button>
    <div class="time">{{ nowTime }}</div>

    <div>
      <span class="item" v-for="image, index in images" :key="image" @click="showCurrent(image)"> {{ index }}</span>
    </div>
    <img :src="currentImage" style="width: 600px;"/>
    <div>
      <router-link to="/">go home</router-link>
      <router-link to="/page1">go page1</router-link>
      <router-link to="/page2">go page2</router-link>
    </div>
    <transition name="slide" enter-class="enter-class" leave-class="leave-class">
        <router-view></router-view>
    </transition>
    
  </div>
</template>
<script>

export default {
  name: "App",
  data() {
    let images = [require('@/assets/images/ai.jpeg'), require('@/assets/images/caoyuan.jpeg'), require('@/assets/images/icon.jpeg')]
    return {
      title: "我是一个VUE的应用",
      nowTime: "",
      images,
      currentImage: images[0]
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

    showCurrent(image) {
      this.currentImage = image

      console.log([[1],[2], [3]].flat(1))
    }
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

.item {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 1px solid burlywood;
  background-color: white;
  color: #000;
  font-size: 18px;
  text-align: center;
  line-height: 32px;
}
</style>