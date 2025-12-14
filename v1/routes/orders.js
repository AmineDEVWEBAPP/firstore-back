import express from 'express'
import { getOrders } from '../controller/orgers.js'

const router = express.Router()
export default router

router.get('/orders', getOrders)