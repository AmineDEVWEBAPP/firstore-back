import express from 'express'
import { createOffers } from '../controller/offers.js'
import authJWT from '../middlewares/admin/authJWT.js'
import strictArgs from '../middlewares/strictArgs.js'

const router = express.Router()
export default router

router.post('/', [authJWT, strictArgs({
    'name': 'string',
    'price': 'number',
    'priceCurrency': 'string',
    'quality': 'string',
    'resulotion': 'string',
    'supportedDevices': 'string',
    'maximumDevices': 'number',
    'maximumDownloadDevices': 'number'
})], createOffers)