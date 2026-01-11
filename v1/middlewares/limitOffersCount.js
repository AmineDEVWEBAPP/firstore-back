import db from '../config/db.js'
import error from '../utils/error.js'

export default function limitOffersCount(_req, res, next) {
    const query = 'SELECT COUNT(id) FROM offers;'
    db.query(query, [], function (err, results) {
        if (err) return error(err, res)
        if (results[0]['COUNT(id)'] >= 3) return error({ 'mess': 'The maximum number of offers is 3', 'statusCode': 409 }, res)
        next()
    })
}
