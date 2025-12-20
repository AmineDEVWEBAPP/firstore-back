import express from 'express'
import validator from 'validator'

const router = express.Router()
export default router

router.all('/', function (req, res) {
console.log(req.body)
  res.end('test')
})