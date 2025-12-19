import express from 'express'

const router = express.Router()
export default router

router.all('/', function (req, res) {
const i=['amine','mohammed']
for(const o of i){
  console.log(o)
}
  res.end('test')
})