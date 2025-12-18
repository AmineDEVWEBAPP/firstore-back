import express from 'express'
import authJWT from '../middlewares/admin/authJWT.js'
import { createAccount, deleteAccount } from '../controller/accounts.js'
import strictArgs from '../middlewares/strictArgs.js'

const router = express.Router()
export default router

router.post('/', [authJWT, strictArgs({ 'offerId': 'number', 'email': 'string', 'password': 'string' }
)], createAccount)

router.delete('/:id', authJWT, deleteAccount)