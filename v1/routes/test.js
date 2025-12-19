import express from 'express'

const router = express.Router()
export default router

router.all('/', function (req, res) {
  const test="9+9"
  const un=parseInt(test)
 console.log(un)
 console.log(isNaN(null))
  res.end('test')
})