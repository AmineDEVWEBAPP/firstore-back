import express from 'express'
import { createOffer, deleteOffer, getOfferById, getOffers, updateOffer } from '../controller/offers.js'
import authJWT from '../middlewares/admin/authJWT.js'
import strictArgs from '../middlewares/strictArgs.js'
import error from '../utils/error.js'

const router = express.Router()
export default router

router.post('/', [authJWT,
    strictArgs({
        'name': 'string',
        'price': 'number',
        'priceCurrency': 'string',
        'quality': 'string',
        'resulotion': 'string',
        'supportedDevices': 'string',
        'maximumDevices': 'number',
        'maximumDownloadDevices': 'number'
    }),
    strictArgs({
        'haveSpatialAudio': 'boolean'
    }, false)], createOffer)

router.put('/', [authJWT, strictArgs({ 'id': 'number' }), strictArgs({
    'id': 'number',
    'name': 'string',
    'price': 'number',
    'priceCurrency': 'string',
    'quality': 'string',
    'haveSpatialAudio': 'boolean',
    'resulotion': 'string',
    'supportedDevices': 'string',
    'maximumDevices': 'number',
    'maximumDownloadDevices': 'number'
}, false), function (req, res, next) {
    const requireData = { ...req.body }
    delete requireData.id
    if (Object.keys(requireData).length === 0) return error({ 'mess': 'fields is require', 'statusCode': 400 }, res)
    next()
}], updateOffer)

router.delete('/', [authJWT, strictArgs({ 'id': 'number' })], deleteOffer)

router.get('/',getOffers)

router.get('/:id',getOfferById)