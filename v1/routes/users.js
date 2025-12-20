import express from 'express'
import { createUser } from '../controller/users.js'
import authJWT from "../middlewares/admin/authJWT.js";
import strictArgs from '../middlewares/strictArgs.js'
import validUserParams from '../middlewares/user/validUserParams.js';


const router = express.Router()
export default router

router.post('/', [
    authJWT,
    strictArgs({ 'profileId': 'number', 'phone': 'string', 'type': 'string' }),
    strictArgs({ 'email': 'string', 'active': 'boolean' }, false),
    validUserParams
], createUser)