import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
import dataToQuery from '../utils/dataToSql.js'


const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
  const tableColumns = ['id', 'name', 'price', 'price_currency', 'quality', 'resulotion', 'have_spatial_audio', 'supported_devices', 'maximum_devices', 'maximum_download_devices']
  const { keys, values } = dataToQuery.update(req.body, tableColumns)
  console.log(keys)
  console.log(values)
  res.end('test')
})