import error from "../utils/error.js"

export default function strictArgs(args, required = true) {
    return function (req, res, next) {
        let err = null
        if (required) {
            err = missingArs(req, args)
        }
        if (err) return error(err, res)
        err = strictType(req, args)
        if (err) return error(err, res)
        next()
    }
}


function missingArs(req, args) {
    const argsKey = Object.keys(args)
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
    if (missingArgs.length !== 0) return { 'mess': `Arguments are missing: ${missingArgs.join(', ')}`, 'statusCode': 400 }
}

function strictType(req, argsType) {
    let invalidArgs = []
    for (const key in argsType) {
        if (req.body && req.body[key] !== undefined && typeof req.body[key] !== argsType[key]) {
            invalidArgs.push(key)
        }
    }
    if (invalidArgs.length !== 0) return { "mess": `Invalid argument type: ${invalidArgs.join(', ')}`, 'statusCode': 400 }
}