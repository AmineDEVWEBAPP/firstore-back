import db from '../config/db.js'
import error from '../utils/error.js'
import crypto from 'crypto'

function getProfileUrl(offerId, callback) {
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

export function getUrl(req, res) {
    const offerId = parseInt(req.query.offerId)
    getProfileUrl(offerId, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'Payment url not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results[0]))
    })
}

export function startPayment(req, res) {
    const offerId = parseInt(req.body.offerId)
    getProfileUrl(offerId, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'Payment url not found', 'statusCode': 404 }, res)
        let url = results[0]['payment_url']
        const token = crypto.randomBytes(16).toString('base64')
        const phone = req.body.phone
        const query = `INSERT INTO pending_payment (token, phone) VALUES(?, ?)`
        db.query(query, [token, phone], function (err) {
            if (err) return error(err, res)
            url += `?pay_token=${token}`
            res.end(JSON.stringify({ 'url': url }))
        })
    })
}
