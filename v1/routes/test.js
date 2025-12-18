import express from 'express'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  console.log(req.body)
  res.end('test')
})