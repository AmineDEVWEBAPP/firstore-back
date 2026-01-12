import fs from 'fs'

export default function error(err, res) {
    console.error(err)
    const statusCode = err.statusCode ? err.statusCode : 500
    const message = err.mess ? err.mess : 'Internal server error'
    res.writeHead(statusCode)
    res.end(`{"errorff": "${err}"}`)
    // res.end(`{"error": "${message}"}`)
    err.mess = message
    err.statusCode = statusCode
    loggerError(err)
}

function loggerError(err) {
    const newError = {
        'time': new Date().toISOString(),
        'message': err.mess,
        'statusCode': err.statusCode,
        'code': err.code || null,
        'stack': err.stack || null

    }
    try {
        let data = []
        try {
            const file = fs.readFileSync('.data/errors.json', 'utf8')
            data = JSON.parse(file)
            if (!Array.isArray(data)) data = []
        } catch (e) {
            data = []
        }
        data.push(newError)
        fs.writeFileSync('.data/errors.json', JSON.stringify(data, null, 2), 'utf8')
    } catch (e) {
        console.error(e)
    }
}