import env from './v1/config/env.js'
import express from 'express'
import testRouter from './v1/routes/test.js'
import adminRoute from './v1/routes/admin.js'
import offersRoute from './v1/routes/offers.js'
import helmet from 'helmet'
import cors from 'cors'
import accountsRoute from './v1/routes/accounts.js'
import checkoutRoute from './v1/routes/checkout.js'
import profilesRoute from './v1/routes/profiles.js'
import authJWT from './v1/middlewares/admin/authJWT.js'
import usersRoute from './v1/routes/users.js'

const app = express()

app.use((err, _req, res, next) => {
    if (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        return res.end('{"error": "Internal Server Error"}')
    }
    next()
})

app.use(helmet())

app.use(cors({
    'origin': 'http://localhost:3000',
    'methods': ['GET', 'POST', 'PATH', 'OPTIONS'],
    'allowedHeaders': ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/test', testRouter)

app.use('/api/v1/admin', adminRoute)

app.use('/api/v1/offers', offersRoute)

app.use('/api/v1/accounts', authJWT, accountsRoute)

app.use('/api/v1/checkout', checkoutRoute)

app.use('/api/v1/profiles', authJWT, profilesRoute)

app.use('/api/v1/users', usersRoute)

app.use(function (_, res) {
    res.writeHead(404)
    res.end('{"error": "not found"}')
})

app.listen(env.port, () => {
    console.log(`Server running at 'http://localhost:${env.port} in ${env.envName} mode`);
})
