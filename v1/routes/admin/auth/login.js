import express from 'express'
import allowMethods from '../../../middlewares/allowedMethods.js'
import { adminLogin } from '../../../controller/admin.js'
import strictArgs from '../../../middlewares/strictArgs.js'
import correctPassword from '../../../middlewares/admin/auth/correctPassword.js'
import validator from 'validator'
import error from '../../../utils/error.js'
import loginLimiter from '../../../middlewares/loginLimiter.js'

const router = express.Router()
export default router

router.use(strictArgs({ 'email': 'string', 'password': 'string' }))

router.use(function (req, res, next) {
    const email = req.body.email
    if (!validator.isEmail(email)) return error({ 'mess': 'not found', 'statusCode': 404 }, res)
    next()
})

router.use(correctPassword)

router.use(allowMethods(['POST']))

router.use(loginLimiter)

router.post('/login', adminLogin)