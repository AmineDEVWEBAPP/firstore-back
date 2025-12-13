import mysql from 'mysql'
import env from './env.js'

const pool = mysql.createPool({
    'host': env.DB_HOST,
    'user': env.DB_USER,
    'password': env.DB_PASSWORD,
    'database': env.DB_NAME,
    'waitForConnections': true,
    'connectionLimit': 10,
    'queueLimit': 0
})

const db = {
    'pool': pool
}

export default db

db.query = function (connOrQuery, queryOrParams, paramsOrCallback, maybeCallback) {
    let conn, query, params, callback

    if (typeof connOrQuery === 'object' && connOrQuery.query) {
        conn = connOrQuery
        query = queryOrParams
        params = paramsOrCallback
        callback = maybeCallback
    } else {
        query = connOrQuery
        params = queryOrParams
        callback = paramsOrCallback
        conn = pool
    }
    conn.query(query, params, function (err, results, fields) {
        if (err) return callback(err)
        callback(null, JSON.parse(JSON.stringify(results)), fields)
    })
}
