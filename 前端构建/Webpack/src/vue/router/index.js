import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Home from '@/vue/pages/home/index.vue'

const routes = [{
    path: '/',
    component: Home,
    name: 'home'
},{
    path: '/page1',
    component: ()=> {
        return new Promise((resolve)=> {
            setTimeout(()=> {
                resolve(import(/* webpackChunkName: "async-page1" */ '@/vue/pages/page1/index.vue'))
            }, 3000)
        })
    },
    name: 'page1'
}, {
    path: '/page2',
    component: () => {
        return import(/* webpackChunkName: "async-page2" */ '@/vue/pages/page2/index.vue')
    },
    name: 'page2'
}]


export default new VueRouter({
    routes
})