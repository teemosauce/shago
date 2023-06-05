import moment from "moment/moment"

export const getDate = () => {
    return moment().format('YYYY年MMMMDo , h:mm:ss a')
}

export const getTime = () => Date.now()

export const formatDate = () => {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth()
    let date = d.getDate()
    return `${year}-${month}-${date}`
}