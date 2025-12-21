import express from 'express'
import validator from 'validator'
import crypto from 'crypto'
import db from '../config/db.js'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  res.end('test')
   console.log(res.finished)
})