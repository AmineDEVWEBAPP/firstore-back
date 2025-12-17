import db from '../config/db.js'
import toSQLformat from '../utils/toSQLformat.js'

const Offer = {}
export default Offer

Offer.create = function (data, callback) {
    const query = 'INSERT INTO offers (name, price, price_currency, quality, resulotion, have_spatial_audio, supported_devices, maximum_devices, maximum_download_devices) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [data.name, data.price, data.priceCurrency, data.quality, data.resulotion, data.haveSpatialAudio ?? false, data.supportedDevices, data.maximumDevices, data.maximumDownloadDevices]
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}

Offer.update = function (data, callback) {
    const convertedData = { ...data }
    delete convertedData.id
    const { values, keys } = toSQLformat(convertedData)
    const query = `UPDATE offers SET ${keys} WHERE id = ${data.id}`
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        if (result.affectedRows === 0) return callback({ 'mess': 'Offer not found', 'statusCode': 404 })
        callback(null, result)
    })
}