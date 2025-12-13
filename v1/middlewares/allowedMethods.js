export default function allowMethods(methods) {
    const loweredMethods = methods.map(m => m.toUpperCase())
    return function (req, res, next) {
        if (!loweredMethods.includes(req.method)) {
            res.writeHead(405)
            return res.end('{"error": "Method Not Allowed"}')
        }
        next()
    }
}