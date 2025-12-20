import validator from 'validator'
import error from '../../utils/error.js'

export default function validUserParams(req, res, next) {
    const body = req.body
    if (body.email && !validator.isEmail(body.email))
        return error({ 'mess': 'Invalid email format', 'statusCode': 400 }, res)
    if (body.phone && validator.isMobilePhone(body.phone, 'any', { strictMOde: true }))
        return error({ 'mess': 'Invalid phone number', 'statusCode': 400 }, res)
    if (body.lastPayTime && !validator.isISO8601(body.lastPayTime))
        return error({ 'mess': 'Invalid lastPayTime value', 'statusCode': 400 }, res)
    next()
}