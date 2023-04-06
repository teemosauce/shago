// 写一个执行批量异步任务的方法，支持传递同时执行的任务个数

/**
 * 执行批量任务
 * @param {Array} tasks 所有的异步任务
 * @param {number} count 最大并发数
 * @returns 
 */
function runTasks(tasks, count = 5) {
    return new Promise((resolve, reject) => {
        let taskCount = tasks.length
        if (taskCount <= 0) {
            return resolve()
        }
        count = taskCount > count ? count : taskCount // 每次最大执行的任务数量
        let nextIndex = 0 // 当完成一个任务后，要执行的下一个任务
        let resolveCount = 0 // 已完成的任务数量
        let result = [] // 保存每个任务的结果

        // 执行单个任务的处理
        function _runTask() {
            let task = tasks[nextIndex];
            let id = nextIndex
            nextIndex++
            console.log(`*******任务${id}开始执行*******`);
            let timeStart = Date.now()
            task().then(res => {
                console.log(`任务${id}执行完毕 - ${Math.floor(Date.now() - timeStart)}ms`);
                result.push(res)
                processNext()
            }).catch(err => {
                // 处理异常 任务中间某个任务异常 不影响后续任务的执行
                console.log(`任务${id}执行失败 - ${Math.floor(Date.now() - timeStart)}ms`);
                result.push(err)
                processNext()
            })
        }

        // 任务执行完成的处理
        function processNext() {
            resolveCount++
            if (nextIndex < taskCount) {
                // 如果还有任务未执行 添加下一个任务
                _runTask()
            } else if (resolveCount === taskCount) {
                // 所有任务执行完毕
                resolve()
            }
        }

        // 一开始先运行指定数量的任务
        for (let i = 0; i < count; i++) {
            _runTask()
        }
    })
}

/**
 * 生成一个随机耗时的异步任务
 */
function generateAsync() {
    return function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, Math.floor(Math.random() * 1000) * 5)
        })
    }
}


function main() {
    let tasks = []

    for (var i = 0; i < 1000; i++) {
        tasks.push(generateAsync())
    }
    console.time('任务总耗时')
    runTasks(tasks, 20).then(() => {
        console.timeEnd('任务总耗时')
    })
}
main()