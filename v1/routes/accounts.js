import express from 'express'
import authJWT from '../middlewares/admin/authJWT.js'
import { createAccount, deleteAccount } from '../controller/accounts.js'
import strictArgs from '../middlewares/strictArgs.js'

const router = express.Router()
export default router

router.post('/', [authJWT,
    strictArgs({ 'email': 'string', 'password': 'string' },
        strictArgs({ 'offerId': 'number' }, false)
    )], createAccount)

router.delete('/:id', authJWT, deleteAccount)