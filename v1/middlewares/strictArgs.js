export default function strictArgs(args) {
    return function (req, res, next) {
        const argsKey = Object.keys(args)
        let err = null
        err = missingArs(req, res, argsKey)
        if (err) {
            res.writeHead(400)
            return res.end(err)
        }
        if (!res.finished) {
            err = strictType(req, res, args)
            if (err) {
                res.writeHead(400)
                return res.end(err)
            }
        }
        next()
    }
}

function missingArs(req, _, argsKey) {
    let missingArgs = []
    for (const arg of argsKey) {
        if (req.body) {
            if (!req.body[arg]) {
                missingArgs.push(arg)
            }
        } else {
            missingArgs.push(arg)
        }
    }
    if (missingArgs.length !== 0) {
        return `{ 'error': '${missingArgs.join(', ')} arguments are missing' }`
    }
}

function strictType(req, _, argsType) {
    for (const key in argsType) {
        if (typeof req.body[key] !== argsType[key]) {
            return '{"error": "Invalid argument type"}'
        }
    }
}
