import express from 'express'
import authJWT from '../middlewares/admin/authJWT.js'
import { createAccount, deleteAccount, getAccountById, getAccounts, updateAccount } from '../controller/accounts.js'
import strictArgs from '../middlewares/strictArgs.js'
import emptyBody from '../middlewares/emptyBody.js'

const router = express.Router()
export default router

router.use(authJWT)

router.post('/', [
    strictArgs({ 'email': 'string', 'password': 'string' }),
    strictArgs({ 'offerId': 'number' }, false)
], createAccount)

router.delete('/:id', deleteAccount)

router.patch('/:id', [
    strictArgs({ 'email': 'string', 'password': 'string', 'it_works': 'boolean' }, false),
    emptyBody],
    updateAccount)

router.get('/', getAccounts)

router.get('/:id', getAccountById)