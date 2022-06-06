export default (knexQuery) => {
    return new Promise((resolve, reject) => {
        resolve(knexQuery)
    })
}