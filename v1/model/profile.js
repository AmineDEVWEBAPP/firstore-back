import db from '../config/db.js'

const Profile = {}
export default Profile

Profile.findAll = function (callback) {
    const query = 'SELECT * FROM profiles'
    db.query(query, [], function (err, results) {
        callback(err, results)
    })
}