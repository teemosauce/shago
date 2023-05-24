import { print } from "./print"

export const getDate = () => {
    return new Date().toLocaleDateString()
}

export const getTime = () => Date.now()

export const formatDate = () => {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth()
    let date = d.getDate()
    return `${year}-${month}-${date}`
}


export const logDate = () => {
    print(formatDate)
}