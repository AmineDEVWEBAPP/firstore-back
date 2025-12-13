import env from './v1/config/env.js'
import express from 'express'
import adminRegisterRouter from './v1/routes/admin/register.js'
import testRouter from './v1/routes/test.js'
import session from 'express-session'

const app = express()

app.use((err, _req, res, _next) => {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end('{"error": "Internal Server Error"}')
})

app.use(session(
    {
        name: 'adminsid',
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: env.envName === 'prod', maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }
    }
))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/admin', adminRegisterRouter)

app.use('/api/v1/test', testRouter)

app.listen(env.port, () => {
    console.log(`Server running at 'http://localhost:${env.port} in ${env.envName} mode`);
})