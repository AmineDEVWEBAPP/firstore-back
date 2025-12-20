import dataToSql from '../utils/dataToSql.js'
import db from '../config/db.js'

const User = {}
export default User

User.columns = ['profile_id', 'email', 'phone', 'type','active','pay_time']

User.create = function (data, callback) {
    const { keys, values } = dataToSql.create(data, User.columns)
    const query = `INSERT INTO users (${keys}) VALUES(${values})`
    db.query(query, Object.values(data), function (err, results) {
        callback(err, results)
    })
}