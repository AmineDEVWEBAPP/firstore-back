import db from "../config/db.js"

const Admin = {}

export default Admin

Admin.findByEmail = function (email, callback) {
    const query = 'SELECT * FROM admins WHERE email = ?'
    db.query(query, [email], function (err, results) {
        if (err) return callback(err)
        if (!results[0]) return callback({ 'mess': 'admin not found', 'statusCode': 404 })
        callback(null, results[0])
    })
}