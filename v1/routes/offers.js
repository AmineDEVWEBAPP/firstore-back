import express from 'express'
import { createOffer, deleteOffer, getAccounts, getOfferById, getOffers, getProfiles, updateOffer } from '../controller/offers.js'
import authJWT from '../middlewares/admin/authJWT.js'
import strictArgs from '../middlewares/strictArgs.js'

const router = express.Router()
export default router

router.get('/', getOffers)

router.use(authJWT)

router.post('/', [
    strictArgs({
        'name': 'string',
        'price': 'number',
        'priceCurrency': 'string',
        'quality': 'string',
        'resolution': 'string',
        'supportedDevices': 'string',
        'maximumDevices': 'number',
        'maximumDownloadDevices': 'number'
    }),
    strictArgs({
        'haveSpatialAudio': 'boolean'
    }, false)], createOffer)

router.put('/:id', strictArgs({
    'name': 'string',
    'price': 'number',
    'priceCurrency': 'string',
    'quality': 'string',
    'haveSpatialAudio': 'boolean',
    'resolution': 'string',
    'supportedDevices': 'string',
    'maximumDevices': 'number',
    'maximumDownloadDevices': 'number'
}, false, { atLeastOne: true }), updateOffer)

router.delete('/:id', deleteOffer)

router.get('/:id', getOfferById)

router.get('/:id/accounts', getAccounts)

router.get('/:id/profiles', getProfiles)