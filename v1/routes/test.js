import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'


const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
    res.end('test')
})