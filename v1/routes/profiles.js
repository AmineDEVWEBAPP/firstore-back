import express from "express";
import { createProfile, getProfiles, updateProfile } from "../controller/profiles.js";
import strictArgs from "../middlewares/strictArgs.js";
import authJWT from "../middlewares/admin/authJWT.js";

const router = express.Router();
export default router

router.get('/', getProfiles)

router.use(authJWT)

router.post('/',
    strictArgs({ 'accountId': 'number', 'name': 'string', 'pinCode': 'number', 'paymentUrl': 'string' }),
    createProfile)

router.patch('/:id',
    strictArgs({ 'name': 'string', 'pinCode': 'number', 'paymentUrl': 'string', 'used': 'boolean' }, false, { atLeastOne: true }),
    updateProfile)