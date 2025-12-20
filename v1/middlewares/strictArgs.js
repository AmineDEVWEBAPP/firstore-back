import error from "../utils/error.js"

export default function strictArgs(args, required = true, { atLeastOne = false } = {}) {
    return function (req, res, next) {
        let err = null
        if (required) {
            err = missingArs(req, args)
        }
        if (atLeastOne) {
            err = oneAtLeast(req, args)
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
            const rKey = req.body[arg]
            if (rKey === undefined || rKey === null) {
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

function oneAtLeast(req, args) {
    const body = req.body
    const argsKey = Object.keys(args)
    if (!body) return { 'mess': `Missing at least one of: ${argsKey.join(', ')}`, 'statusCode': 400 }
    const bodyKeys = Object.keys(body)
    for (const key of bodyKeys) {
        if (argsKey.includes(key)) return null
    }
    return { 'mess': `Missing at least one of: ${argsKey.join(', ')}`, 'statusCode': 400 }
}