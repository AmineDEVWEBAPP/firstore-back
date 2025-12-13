import env from './v1/config/env.js'
import express from 'express'
import testRouter from './v1/routes/test.js'
import adminLoginRouter from './v1/routes/admin/auth/login.js'
import isAdmin from './v1/middlewares/admin/isAdmin.js'

const app = express()

app.use((err, _req, res, next) => {
    if (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        return res.end('{"error": "Internal Server Error"}')
    }
    next()
})

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/test', testRouter)

app.use('/api/v1/admin', isAdmin, adminLoginRouter)

app.use(function (_, res) {
    res.writeHead(404)
    res.end('{"error": "not found"}')
})

app.listen(env.port, () => {
    console.log(`Server running at 'http://localhost:${env.port} in ${env.envName} mode`);
})
