import { getDate } from "./utils";

import './style/common.css'

import content from './what.abc'

import Vue from 'vue'

function printDate() {
    console.log(getDate())
}

function run() {
    printDate()

    document.onreadystatechange = (ev) => {
        console.log(ev)
    }

    window.onload = (e) => {
        document.getElementById('title').addEventListener('click', (e) => {
            e.target.innerText = content
        })
    }

    console.log(777)


    new Vue({
        data() {
            return {
                title: '我是一个VUE应用',
                nowTime: ''
            }
        },
        template: `
        <div class="vue-container">
            <h1>{{title}}</h1>
            <button @click="showTime">点击查看时间</button>
            <div class="time">{{nowTime}}</div>
        </div>`,
        methods: {
            showTime() {
                if (!this.timer) {
                    this.nowTime = new Date().toLocaleString()
                    this.timer = setInterval(() => {
                        this.nowTime = new Date().toLocaleString()
                    }, 1000)
                }
            }
        },
        beforeDestroyed() {
            console.log("beforeDestroyed")
            clearInterval(this.timer)
        },
        el: '#vueApp'
    })
}

run()