import Offer from '../model/offer.js'
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
    const id = req.params.id
    Offer.update(id, req.body, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.end('{"status": "success"}')
    })
}

export function deleteOffer(req, res) {
    const id = req.params.id
    Offer.delete(id, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.end('{"status": "success"}')
    })
}

export function getOffers(_, res) {
    Offer.findAll(function (err, results) {
        if (err) return error(err, res)
        res.end(JSON.stringify(results))
    })
}

export function getOfferById(req, res) {
    const id = req.params.id
    Offer.findByID(id, function (err, result) {
        if (err) return error(err, res)
        if (result.length === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(result[0]))
    })
}

export function getAccounts(req, res) {
    const id = req.params.id
    Offer.findAccounds(id, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results))
    })
}