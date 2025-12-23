import validator from 'validator'
import error from '../../utils/error.js'


export default function validAdminEmail(req, res, next) {
    const email = req.body.email
    if (!validator.isEmail(email)) return error({ 'mess': 'not found', 'statusCode': 404 }, res)
    next()
}