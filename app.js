import env from './v1/config/env.js'
import express from 'express'
import testRouter from './v1/routes/test.js'

const app = express()

app.use((err, _req, res, _next) => {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end('{"error": "Internal Server Error"}')
})


app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/test', testRouter)

app.listen(env.port, () => {
    console.log(`Server running at 'http://localhost:${env.port} in ${env.envName} mode`);
})