import express from 'express'
import validator from 'validator'
import crypto from 'crypto'
import db from '../config/db.js'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  const token = 'KTby+1g2ACsoLYmLCGmtcg=='
  db.query('SELECT phone FROM pending_payment WHERE token = ?', [token], function (err, results) {
    console.log(results[0].phone)
    console.log(err)
  })
  res.end('test')
})