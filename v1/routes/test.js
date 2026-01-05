import express from 'express'

const router = express.Router()
export default router

router.all('/', async function (req, res) {
  console.log(isNaN(undefined))
  res.end('test')
})