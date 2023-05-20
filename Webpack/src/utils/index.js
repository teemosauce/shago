export const getDate = () => {
    return new Date().toLocaleDateString()
}

export const isBrowser = () => {
    return typeof window !== 'undefined'
}