import Offer from '../model/offers.js'
import error from '../utils/error.js'

export function createOffer(req, res) {
    const body = req.body
    Offer.create(body, function (err, _) {
        if (err) return error(err, res)
        res.writeHead(201)
        res.end('{"status": "success"}')
    })
}

export function updateOffer(req, res) {
    Offer.update(req.body, function (err) {
        if (err) return error(err, res)
        res.end('{"status": "success"}')
    })
}

export function deleteOffer(req, res) {
    const id = req.body.id
    Offer.delete(id, function (err) {
        if (err) return error(err, res)
        res.end('{"status": "success"}')
    })
}