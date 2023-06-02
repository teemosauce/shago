<template>
    <div class="page2">
        我是页面一
        <u-button @click="handleClick">自定义按钮</u-button>
    </div>
</template>

<script>
import UButton from '../../components/button/index'

export default {
    components: {
        UButton
    },

    methods: {
        handleClick(e) {
            console.log("My clicked!")
        }
    }

}
</script>
<style lang="scss" scoped>
    .page2 {
        color: green;
        text-align: center;
        height: 400px;
    }
</style>