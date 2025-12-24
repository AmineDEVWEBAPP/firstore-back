import jwt from "jsonwebtoken"
import error from "../../utils/error.js"
import env from "../../config/env.js"

export default function authJWT(req, res, next) {
    if (!req.headers['cookie']) return notFound(res)
    const token = req.cookies.adminToken
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET)
        if (decoded['role'] !== 'admin') return notFound(res)
        next()
    } catch (e) {
        console.error(e)
        return error({ 'mess': 'not found', 'statusCode': 404 }, res)
    }
}

function notFound(res) {
    error({ 'mess': 'not found', 'statusCode': 404 }, res)
}