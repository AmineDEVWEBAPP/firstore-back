import express from 'express'
import validator from 'validator'

const router = express.Router()
export default router

router.all('/', function (req, res) {
console.log(validator.isISO8601('2025-12-1'))
  res.end('test')
})