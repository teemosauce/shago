<template>
  <div class="page2">
    我是页面二

    <div style="height:800px;background-color: cadetblue;">
        故意撑满 发现只有这样才会有懒加载的效果
    </div>
    <el-image
      v-for="url in images"
      :key="url"
      :src="url"
      style="width: 1000px"
      test-attr="test"
      lazy
    >
      <!-- <div slot="placeholder" class="image-loading">
        加载中<span class="dot">...</span>
      </div>

      <div slot="error" class="image-error">失败</div> -->
    </el-image>
  </div>
</template>

<script>
import caoyuan from "@/assets/images/caoyuan.jpeg";
import icon300 from "@/assets/images/icon.jpeg";
import ai from "@/assets/images/ai.jpeg";
console.log("caoyuan", caoyuan);

let largeImage =
  "http://jtapi.bendibao.com/ditie/inc/bj/xianluda.gif?2023053017";
export default {
  data() {
    return {
      images: [
        caoyuan,
        icon300,
        largeImage,
        ai,
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.page2 {
  color: blue;
  height: 400px;
  overflow: scroll;
  height: 400px;
}

.image-loading {
  color: white;
  font-size: 12px;
  text-align: center;
  
}

.image-error {
  color: red;
  font-size: 12px;
  text-align: center;
}
</style>