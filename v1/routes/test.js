import express from 'express'
import fs from 'fs'

const router = express.Router()
export default router

router.all('/', async function (req, res) {
  fs.writeFileSync('.data/errors.json',JSON.stringify({"age":44}), 'utf8')
const file =fs.readFileSync('.data/errors.json','utf8')
  console.log(file)
  res.end('test')
})