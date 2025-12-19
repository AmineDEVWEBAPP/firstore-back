import db from '../config/db.js'
import dataToQuery from '../utils/dataToSql.js'

const Profile = {}
export default Profile

Profile.findAll = function (callback) {
    const query = 'SELECT * FROM profiles'
    db.query(query, [], function (err, results) {
        callback(err, results)
    })
}

Profile.columns = ['account_id', 'name', 'pin_code', 'payment_url']

Profile.create = function (data, callback) {
    const { keys, values } = dataToQuery.create(data, Profile.columns)
    const query = `INSERT INTO profiles (${keys}) VALUES(${values})`
    db.query(query, Object.values(data), function (err, result) {
        callback(err, result)
    })
}

Profile.update = function (id, data, callback) {
    const { keys, values } = dataToQuery.update(data, ['name', 'used', 'pin_code', 'used', 'payment_url'])
    values.push(id)
    const query = `UPDATE profiles SET ${keys} WHERE id = ?`
    db.query(query, values, function (err, result) {
        callback(err, result)
    })
}