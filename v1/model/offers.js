import db from '../config/db.js'
import dataToQuery from '../utils/dataToSql.js'

const Offer = {}
export default Offer

Offer.columns = ['id', 'name', 'price', 'price_currency', 'quality', 'resulotion', 'have_spatial_audio', 'supported_devices', 'maximum_devices', 'maximum_download_devices']

Offer.create = function (data, callback) {
    const { keys, values } = dataToQuery.create(data, Offer.columns)
    const query = `INSERT INTO offers (${keys}) VALUES(${values})`
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.update = function (data, callback) {
    const convertedData = { ...data }
    delete convertedData.id
    const { keys, values } = dataToQuery.update(convertedData, Offer.columns)
    const query = `UPDATE offers SET ${keys} WHERE id = ${data.id}`
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        if (result.affectedRows === 0) return callback({ 'mess': 'Offer not found', 'statusCode': 404 })
        callback(null, result)
    })
}
