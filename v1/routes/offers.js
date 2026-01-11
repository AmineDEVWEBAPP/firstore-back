import express from 'express'
import { createOffer, deleteOffer, getAccounts, getOfferById, getOffers, getProfiles, updateOffer } from '../controller/offers.js'
import authJWT from '../middlewares/admin/authJWT.js'
import strictArgs from '../middlewares/strictArgs.js'
import limitOffersCount from '../middlewares/limitOffersCount.js'

const router = express.Router()
export default router

router.get('/', getOffers)

router.use(authJWT)

router.post('/', [
    limitOffersCount,
    strictArgs({
        'name': 'string',
        'price': 'number',
        'priceCurrency': 'string',
        'resolution': 'string',
        'quality': 'string',
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
    'haveSpatialAudio': 'boolean',
    'resolution': 'string',
    'quality': 'string',
    'supportedDevices': 'string',
    'maximumDevices': 'number',
    'maximumDownloadDevices': 'number'
}, false, { atLeastOne: true }), updateOffer)

router.delete('/:id', deleteOffer)

router.get('/:id', getOfferById)

router.get('/:id/accounts', getAccounts)

router.get('/:id/profiles', getProfiles)