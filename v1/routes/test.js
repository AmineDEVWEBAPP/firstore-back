import express from 'express'
import db from '../config/db.js'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  db.query('SELECT * FROM accounts' ,[],function(err,rest){
    console.log(rest)
  })
  res.end('test')
})