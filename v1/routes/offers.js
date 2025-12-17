import express from 'express'
import { createOffer, deleteOffer, getOfferById, getOffers, updateOffer } from '../controller/offers.js'
import authJWT from '../middlewares/admin/authJWT.js'
import strictArgs from '../middlewares/strictArgs.js'
import emptyBody from '../middlewares/emptyBody.js'

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

router.put('/:id', [authJWT, strictArgs({
    'name': 'string',
    'price': 'number',
    'priceCurrency': 'string',
    'quality': 'string',
    'haveSpatialAudio': 'boolean',
    'resulotion': 'string',
    'supportedDevices': 'string',
    'maximumDevices': 'number',
    'maximumDownloadDevices': 'number'
}, false), emptyBody], updateOffer)

router.delete('/:id', authJWT, deleteOffer)

router.get('/', getOffers)

router.get('/:id', getOfferById)