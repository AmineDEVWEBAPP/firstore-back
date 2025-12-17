export default function toSQLformat(body) {
    function camelToSnake(value) {
        return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
    const keys = Object.keys(body).map(k => camelToSnake(k)).join(' = ?, ').concat(' = ?')
    const values = Object.values(body)
    return { values, keys }
}