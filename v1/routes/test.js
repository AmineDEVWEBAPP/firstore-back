import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
import getSQLData from '../utils/toSQLformat.js'


const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
  const k={}
  console.log(k)
  res.end('test')
})