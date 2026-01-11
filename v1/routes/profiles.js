import express from "express";
import { createProfile, getProfiles, updateProfile } from "../controller/profiles.js";
import strictArgs from "../middlewares/strictArgs.js";
import authJWT from "../middlewares/admin/authJWT.js";
import error from "../utils/error.js";

const router = express.Router();
export default router

router.get('/', getProfiles)

router.use(authJWT)

function strictPinCode(req, res, next) {
    const { pinCode } = req['body']
    if (pinCode && pinCode.length !== 4) return error({ 'mess': 'Pin code must be exactly 4 characters', 'statusCode': 400 }, res)
    next()

}

router.post('/',
    strictArgs({ 'accountId': 'number', 'name': 'string', 'pinCode': 'string', 'paymentUrl': 'string' }),
    strictPinCode,
    createProfile)

router.patch('/:id',
    strictArgs({ 'name': 'string', 'pinCode': 'string', 'paymentUrl': 'string', 'used': 'boolean' }, false, { atLeastOne: true }),
    strictPinCode,
    updateProfile)