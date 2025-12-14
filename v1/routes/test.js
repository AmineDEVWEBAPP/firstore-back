import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
import db from '../config/db.js'
import verifyPassword from '../utils/verifyPassword.js'

const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
    const clienPassword = 'firstore.r.W.Y.$.6'
    const query = 'SELECT password_hash, password_salt FROM admins WHERE email = "mohammedaminekhadir6@gmail.com"'
    db.query(query, [], function (_, results) {
        const hash = results[0]['password_hash']
        const salt = results[0]['password_salt']
       const isCorrect=verifyPassword(clienPassword,salt,hash)
       console.log(isCorrect)
        res.end('test')
    })
})