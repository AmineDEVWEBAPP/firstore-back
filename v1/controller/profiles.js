import Profile from "../model/profile.js";
import error from '../utils/error.js'

export function getProfiles(_, res) {
    Profile.findAll(function (err, results) {
        if (err) return error(err, res)
        res.end(JSON.stringify(results))
    })
}

export function createProfile(req, res) {
    const body = req.body
    Profile.create(body, function (err, result) {
        if (err && err.errno === 1452) return error({ 'mess': 'Account not found', 'statusCode': 404 }, res)
        if (err) return error(err, res)
        body.id = result.insertId
        body.used = false
        res.writeHead(201)
        res.end(JSON.stringify(body))
    })
}

export function updateProfile(req, res) {
    const id = parseInt(req.params.id)
    const body=req['body']
    if (body.pinCode&&!body.used) req.body.used = false
    Profile.update(id, req.body, function (err, result) {
        if (err) return error(err, result)
        if (result.affectedRows === 0) return error({ 'mess': 'Profile not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}