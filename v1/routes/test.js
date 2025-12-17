import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'


const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
  console.log(typeof 3.3)
    res.end('test')
})