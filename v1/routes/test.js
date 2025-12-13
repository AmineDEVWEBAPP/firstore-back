import express from 'express'
import allowMethods from '../middlewares/allowedMethods.js'
const router = express.Router()
export default router

router.use(allowMethods(['GET']))

router.get('/', function (req, res) {
    req.session.admin={'id':2}
    const expired=req.session.cookie['_expires']
    const sessionId=req.sessionID 
    console.log(expired)
    console.log(sessionId)
    res.end(JSON.stringify({'user':'req.session.user'}))
})