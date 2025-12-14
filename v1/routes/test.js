import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const router = express.Router()
export default router

router.use(allowMethods(['GET', 'OPTIONS']))

router.get('/', function (req, res) {
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoibW9oYW1tZWRhbWluZWtoYWRpcjZAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJhbWluZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTY4NDYwNCwiZXhwIjoxNzY4Mjc2NjA0fQ.ecHjWuFIzPw8PJMxIYDvwD-Pihguku07F7Fqi2wDOqs'
    const decoded=jwt.verify(token,env.JWT_SECRET)
    console.log(decoded['role'])
    res.end('test')
})