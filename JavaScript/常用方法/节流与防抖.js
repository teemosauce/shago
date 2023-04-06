// 防抖函数  给一个方法加上防抖 比如连续的点击 之后再最后一次点击的时候才会执行 常用与按钮提交操作 方式连续快速的点击按钮式，多次重复提交
function debounce(fn, delay = 1000) {
    let timer
    return function () {
        let args = Array.prototype.slice.call(arguments)
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}






// 节流函数 每多少间隔内执行一次 比如 对于触发频繁的操作，像缩放浏览器之类的 规定每100毫秒执行一次
function throttle(fn, delay) {
    let timer
    return function () {
        let args = Array.prototype.slice.call(arguments)
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                clearTimeout(timer)
                timer = null
            }, delay)
        }
    }
}


function execDebounce(submit) {
    let debounceSubmit = debounce(submit, 1000)
    submit()
    submit()

    debounceSubmit()
    debounceSubmit()
}


function execThrottle(redraw) {
    let throttleRedraw = throttle(redraw, 1000)

    for (let i = 0; i < 100000; i++) {
        setTimeout(() => {
            throttleRedraw()
        }, 0);
    }
}


function main() {
    // execDebounce(function submit() {
    //     console.log('提交')
    // })


    execThrottle(function redraw() {
        console.log('重绘')
    })

}




main()