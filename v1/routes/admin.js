import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
import { adminLogin, check, getAdmin } from '../controller/admin.js'
import strictArgs from '../middlewares/strictArgs.js'
import correctPassword from '../middlewares/admin/correctPassword.js'
import isAdmin from '../middlewares/admin/isAdmin.js'
import validAdminEmail from '../middlewares/admin/validAdminEmail.js'
import authJWT from '../middlewares/admin/authJWT.js'
import loginLimiter from '../middlewares/loginLimiter.js'

const router = express.Router()
export default router

router.use(allowMethods(['POST', 'GET']))

router.post('/login', [
    loginLimiter,
    isAdmin,
    strictArgs({ 'email': 'string', 'password': 'string' }),
    validAdminEmail,
    correctPassword
], adminLogin)

router.post('/logged', authJWT, check)

router.get('/', authJWT, getAdmin)
