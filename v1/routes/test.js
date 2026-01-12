import express from 'express'

const router = express.Router()
export default router

router.all('/', async function (_req, res) {
  res.end('{"test":"test"}')
}) 