import Offer from '../model/offer.js'
import error from '../utils/error.js'

export function createOffer(req, res) {
    let body = req.body
    Offer.create(body, function (err, result) {
        if (err) return error(err, res)
        body.id = result.insertId
        body.haveSpatialAudio = body.haveSpatialAudio ? body.haveSpatialAudio : false
        res.writeHead(201)
        res.end(JSON.stringify(body))
    })
}

export function updateOffer(req, res) {
    const id = req.params.id
    Offer.update(id, req.body, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}

export function deleteOffer(req, res) {
    const id = req.params.id
    Offer.delete(id, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Offer not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
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

export function getProfiles(req, res) {
    const id = req.params.id
    Offer.findProfiles(id, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0) return error({ 'mess': 'Profiles not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results))
    })
}