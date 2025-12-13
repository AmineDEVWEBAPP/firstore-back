import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'

const router = express.Router()
export default router

router.use(allowMethods(['GET']))

router.get('/', function (req, res) {
    console.log(req.ip)
    res.end('test')
})