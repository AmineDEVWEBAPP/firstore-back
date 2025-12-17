import db from '../config/db.js'

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
