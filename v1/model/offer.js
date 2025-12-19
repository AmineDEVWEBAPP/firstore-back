import db from '../config/db.js'
import dataToQuery from '../utils/dataToSql.js'

const Offer = {}
export default Offer

Offer.columns = ['name', 'price', 'price_currency', 'quality', 'resulotion', 'have_spatial_audio', 'supported_devices', 'maximum_devices', 'maximum_download_devices']

Offer.create = function (data, callback) {
    const { keys, values } = dataToQuery.create(data, Offer.columns)
    const query = `INSERT INTO offers (${keys}) VALUES(${values})`
    db.query(query, Object.values(data), function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.update = function (id, data, callback) {
    const { keys, values } = dataToQuery.update(data, Offer.columns)
    values.push(id)
    const query = `UPDATE offers SET ${keys} WHERE id = ?`
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.delete = function (id, callback) {
    const query = 'DELETE FROM offers WHERE id = ?'
    db.query(query, [id], function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.findAll = function (callback) {
    const query = 'SELECT * FROM offers'
    db.query(query, [], function (err, results) {
        if (err) return callback(err)
        callback(null, results)
    })
}

Offer.findByID = function (id, callback) {
    const query = 'SELECT * FROM offers WHERE id = ?'
    db.query(query, [id], function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.findAccounds = function (id, callback) {
    const query = 'SELECT * FROM accounts WHERE offer_id = ?'
    db.query(query, [id], function (err, results) {
        if (err) return callback(err)
        callback(null, results)
    })
}

Offer.findProfiles = function (id, callback) {
    const query = `SELECT p.*
                   FROM profiles p
                   JOIN accounts a ON p.account_id = a.id
                   WHERE a.offer_id = ?`
    db.query(query, [id], function (err, results) {
        callback(err, results)
    })
}