import camelToSnake from "./camelToSnake.js"

const dataToQuery = {}
export default dataToQuery

function removeImpurities(data, columns) {
    Object.keys(data).forEach(key => {
        if (!columns.includes(camelToSnake(key))) {
            delete data[key]
        }
    })
}

dataToQuery.create = function (data, columns) {
    removeImpurities(data, columns)
    const keys = Object.keys(data).map(key => camelToSnake(key)).join(', ').replace(/,\s*$/, '')
    const values = Object.values(data).map(() => '?').join(', ').replace(/,\s*$/, '')
    return { values, keys }
}

dataToQuery.update = function toSQLformat(data, columns) {
    removeImpurities(data, columns)
    const keys = Object.keys(data).map(k => camelToSnake(k)).join(' = ?, ').concat(' = ?')
    const values = Object.values(data)
    return { keys, values }
}
