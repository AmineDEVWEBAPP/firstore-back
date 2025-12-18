import db from '../config/db.js'
import dataToQuery from '../utils/dataToSql.js'

const Account = {}
export default Account

Account.create = function (data, callback) {
    const query = 'INSERT INTO accounts (offer_id, email, password) VALUES(?, ?, ?)'
    const values = [data.offerId, data.email, data.password]
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })

}

Account.delete = function (id, callback) {
    const query = 'DELETE FROM accounts WHERE id = ?'
    db.query(query, [id], function (err, result) {
        if (err) callback(err)
        callback(null, result)
    })
}

Account.update = function (id, data, callback) {
    const { keys, values } = dataToQuery.update(data, ['email', 'password', 'it_works'])
    values.push(id)
    const query = `UPDATE accounts SET ${keys} WHERE id = ?`
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}