import dataToSql from '../utils/dataToSql.js'
import db from '../config/db.js'

const User = {}
export default User

User.columns = ['profile_id', 'email', 'phone', 'type', 'last_pay_time']

User.create = function (conn, data, callback) {
    const { keys, values } = dataToSql.create(data, User.columns)
    const query = `INSERT INTO users (${keys}) VALUES(${values})`
    db.query(conn, query, Object.values(data), function (err, results) {
        callback(err, results)
    })
}

User.update = function (id, data, callback) {
    const { keys, values } = dataToSql.update(data, User.columns)
    values.push(id)
    const query = `UPDATE users SET ${keys} WHERE id = ?`
    db.query(query, values, function (err, results) {
        callback(err, results)
    })
}

User.findAll = function (callback) {
    const query = `SELECT
                   users.*,
                   accounts.email        AS account_email,
                   accounts.password     AS account_password,
                   profiles.name         AS profile_name,
                   profiles.pin_code     AS profile_pin_code,
                   offers.name           AS offer_name,
                   offers.id             AS offer_id
                   FROM users
                   JOIN profiles ON profiles.id = users.profile_id
                   JOIN accounts ON accounts.id = profiles.account_id
                   JOIN offers   ON offers.id = accounts.offer_id;
                 `
    db.query(query, [], function (err, results) {
        callback(err, results)
    })
}

User.findById = function (id, callback) {
    const query = `SELECT
                   users.*,
                   accounts.email        AS account_email,
                   accounts.password     AS account_password,
                   profiles.name         AS profile_name,
                   profiles.pin_code     AS profile_pin_code,
                   offers.name           AS offer_name,
                   offers.id             AS offer_id
                   FROM users
                   JOIN profiles ON profiles.id = users.profile_id
                   JOIN accounts ON accounts.id = profiles.account_id
                   JOIN offers   ON offers.id = accounts.offer_id
                   WHERE users.id = ?
                 `
    db.query(query, [id], function (err, results) {
        callback(err, results)
    })
}

User.findByProfileId = function (profileId, callback) {
    const query = 'SELECT * FROM users WHERE profile_id = ?'
    db.query(query, [profileId], function (err, results) {
        callback(err, results)
    })
}

User.news = function (callback) {
    const query = `
SELECT 
  COUNT(*) as count,
  SUM(type = 'whatsapp') as whatsapp_count,
  SUM(type = 'card') as card_count,
  SUM(last_pay_time < DATE_SUB(NOW(), INTERVAL 1 MONTH)) as need_payment
FROM users  
`
    db.query(query, [], function (err, results) {
        return callback(err, results)
    })
}

User.delete = function (conn, id, callback) {
    const query = 'DELETE FROM users WHERE id = ?'
    db.query(conn, query, [id], function (err, results) {
        callback(err, results)
    })
}