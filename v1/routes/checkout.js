import express from "express";
import { getUrl, startPayment } from "../controller/checkout.js";
import strictArgs from "../middlewares/strictArgs.js";
import error from "../utils/error.js";
import validator from 'validator'

const router = express.Router()
export default router

router.get('/url',
    function (req, res, next) {
        if (!req.query.offerId)
            return error({ 'mess': 'offerId query paramiter required', 'statusCode': 400 }, res)
        next()
    },
    getUrl)

router.post('/start',
    [
        strictArgs({ 'phone': 'string', 'offerId': 'number' }),
        function (req, res, next) {
            if (!validator.isMobilePhone(req.body.phone, 'any', { strictMode: true }))
                return error({ 'mess': 'Invalid phone number', 'statusCode': 400 }, res)
            next()
        }
    ],
    startPayment)