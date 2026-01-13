import jwt from 'jsonwebtoken'
import Admin from '../model/admin.js'
import error from '../utils/error.js'
import env from '../config/env.js'

export function adminLogin(req, res) {
    const email = req.body.email
    Admin.findByEmail(email, function (err, result) {
        if (err) return error({ "mess": "not Found", "statusCode": 404 }, res)
        const payload = {
            'id': result['id'],
            'email': email,
            'fullName': result['full_name'],
            'role': 'admin'
        }
        const token = jwt.sign(payload, env.JWT_SECRET, { 'expiresIn': '30d' })
        const expiresIn = getExpiresFromToken(token)
        res.cookie('adminToken', token, {
            'httpOnly': true,
            'path': '/',
            'secure': env.envName === 'prod',
            'sameSite': 'none',
            'expires': expiresIn
        })
        res.writeHead(200)
        res.end('{"status": "success"}')
    })
}

function getExpiresFromToken(token) {
    const decoded = jwt.decode(token)
    const expiresAt = new Date(decoded.exp * 1000)
    return expiresAt
}

export function check(_, res) {
    res.writeHead(204)
    res.end()
}

export function getAdmin(req, res) {
    const token = req.cookies['adminToken']
    const decoded = jwt.decode(token)
    Admin.findByEmail(decoded.email, function (err, results) {
        if (err) return error(err, res)
        const admin = results[0]
        const payload = {
            'email': admin.email,
            'name': admin.full_name
        }
        res.end(JSON.stringify(payload))
    })
}