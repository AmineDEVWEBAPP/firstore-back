import express from 'express'
import allowMethods from '../../middlewares/allowedMethods.js'
import strictArgs from '../../middlewares/strictArgs.js'
import validator from 'validator'
import { registerAdmin } from '../../controller/admin.js'
import Admin from '../../model/admin.js'
import error from '../../utils/error.js'


const router = express.Router()

router.use(allowMethods(['post']))

router.use(strictArgs({ 'email': 'string', 'password': 'string' }))

router.use((req, res, next) => {
    const { email, password } = req.body
    if (!validator.isEmail(email)) {
        res.writeHead(400)
        res.end('{"error":"Invalid email format"}')
    }
    if (password.length < 8) {
        res.writeHead(400)
        return res.end('{"error":"Password is too short"}')
    }
    const fullName = email.split('@')[0]
    if (fullName === password) {
        res.writeHead(400)
        return res.end('{"error":"Password is part of emali eazy to guess"}')
    }
    next()
})

router.use(function (req, res, next) {
    const { email } = req.body
    Admin.findByEmail(email, function (err, results) {
        if (err) return error(err, res)
        if (results.length > 0) {
            res.writeHead(409)
            return res.end("{'error': 'Email already exists'}")
        }
        next()
    })
})

router.post('/register', registerAdmin)

export default router