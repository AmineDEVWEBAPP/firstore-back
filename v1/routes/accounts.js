import express from 'express'
import { createAccount, deleteAccount, getAccountById, getAccounts, getProfiles, updateAccount } from '../controller/accounts.js'
import strictArgs from '../middlewares/strictArgs.js'

const router = express.Router()
export default router

router.post('/', [
    strictArgs({ 'email': 'string', 'password': 'string' }),
    strictArgs({ 'offerId': 'number' }, false)
], createAccount)

router.delete('/:id', deleteAccount)

router.patch('/:id', [
    strictArgs({ 'email': 'string', 'password': 'string', 'it_works': 'boolean' }, false, { atLeastOne: true })],
    updateAccount)

router.get('/', getAccounts)

router.get('/:id', getAccountById)

router.get('/:id/profiles', getProfiles)