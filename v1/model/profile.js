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

Profile.findById = function (id, callback) {
    const query = 'SELECT * FROM profiles WHERE id = ?'
    db.query(query, [id], function (err, results) {
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

Profile.getAvailableByOfferId = function (offerId, callback) {
    const query = `SELECT p.payment_url
                       FROM profiles p
                       JOIN accounts a ON p.account_id = a.id
                       WHERE a.it_works = 1
                       AND p.used = 0
                       AND a.offer_id = ?
                       LIMIT 1`
    db.query(query, [offerId], function (err, results) {
        callback(err, results)
    })
}

Profile.getAvailableByOfferName = function (offerName, callback) {
    const query = `SELECT 
                   profiles.payment_url
                   FROM profiles
                   JOIN accounts ON accounts.id = profiles.account_id
                   JOIN offers   ON offers.id = accounts.offer_id
                   WHERE accounts.it_works = 1
                   AND profiles.used = 0
                   AND offers.name = ?
                   LIMIT 1;
                   `
    db.query(query, [offerName], function (err, results) {
        callback(err, results)
    })
}