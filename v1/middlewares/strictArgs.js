import error from "../utils/error.js"

export default function strictArgs(args, { require = true, invalid = false } = {}) {

    return function (req, res, next) {
        let err = null
        const argsKey = Object.keys(args)
        if (require) {
            err = missingArs(req, argsKey)
        }
        if (err) return error(err, res)
        err = strictType(req, args)
        if (err) return error(err, res)
        if (invalid) {
            err = invalidFields(req, argsKey)
        }
        if (err) return error(err, res)
        next()
    }
}


function missingArs(req, argsKey) {
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
        return { 'mess': `${missingArgs.join(', ')} arguments are missing`, 'statusCode': 400 }
    }
}

function strictType(req, argsType) {
    for (const key in argsType) {
        if (req.body[key] !== undefined && typeof req.body[key] !== argsType[key]) {
            return { "mess": "Invalid argument type", 'statusCode': 400 }
        }
    }
}

function invalidFields(req, argsKey) {
    const invalids = Object.keys(req.body).filter(f => !argsKey.includes(f))
    if (invalids.length !== 0)
        return { "mess": `invalid feilds: ${invalids.join(', ')}`, 'statusCode': 400 }
}