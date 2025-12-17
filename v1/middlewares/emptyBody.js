export default function emptyBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) return error({ 'mess': 'fields is require', 'statusCode': 400 }, res)
    next()
}