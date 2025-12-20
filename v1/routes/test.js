import express from 'express'
import validator from 'validator'
import crypto from 'crypto'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  const token = crypto.randomBytes(16).toString('base64')
  console.log(token.length)
  res.end()
})