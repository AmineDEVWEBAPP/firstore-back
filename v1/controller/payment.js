import db from '../config/db.js'
import error from '../utils/error.js'

export function getUrl(req, res) {
    const offerId = parseInt(req.query.offerId)
    const query = `SELECT p.payment_url
                   FROM profiles p
                   JOIN accounts a ON p.account_id = a.id
                   WHERE a.it_works = 1
                   AND p.used = 0
                   AND a.offer_id = ?
                   LIMIT 1`
    db.query(query, [offerId], function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0) return error({ 'mess': 'Payment url not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results[0]))
    })
}