import express from "express";
import { getUrl } from "../controller/payment.js";
import error from "../utils/error.js";

const router = express.Router()
export default router

router.get('/', function (req, res, next) {
    const offerId = parseInt(req.query.offerId)
    if (isNaN(offerId)) return error({ 'mess': 'OfferId is invalid', 'statusCode': 400 }, res)
    next()
}, getUrl)