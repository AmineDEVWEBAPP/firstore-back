import Offers from '../model/offers.js'
import error from '../utils/error.js'

export function createOffers(req, res) {
    const body = req.body
    Offers.create(body, function (err, _) {
        if (err) return error(err, res)
        res.end('{"status":success}')
    })
}

