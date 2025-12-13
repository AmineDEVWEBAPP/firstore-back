import Admin from '../../../model/admin.js'
import error from '../../../utils/error.js'
import verifyPassword from '../../../utils/verifyPassword.js'

export default function correctPassword(req, res, next) {
    const { email, password } = req.body
    Admin.findByEmail(email, function (err, result) {
        if (err) return notFound(res)
        if (result.length === 0) return notFound(res)
        const hash = result['password_hash']
        const salt = result['password_salt']
        if (!verifyPassword(password, salt, hash)) return notFound(res)
        next()
    })
}


function notFound(res) {
    error({ 'mess': 'not found', 'statusCode': 404 }, res)
}