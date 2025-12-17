import db from '../config/db.js'

const Offers = {}
export default Offers

Offers.create = function (data, callback) {
    const query = 'INSERT INTO offers (name, price, price_currency, quality, resulotion, have_spatial_audio, supported_devices, maximum_devices, maximum_download_devices) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [data.name, data.price, data.priceCurrency, data.quality, data.resulotion, data.haveSpatialAudio ?? false, data.supportedDevices, data.maximumDevices, data.maximumDownloadDevices]
    db.query(query, values, function (err, result) {
        if (err) return callback(err)
        callback(null, result)
    })
}