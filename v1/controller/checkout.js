import db from '../config/db.js'
import error from '../utils/error.js'
import crypto from 'crypto'
import { createUser } from './users.js'
import User from '../model/user.js'
import Profile from '../model/profile.js'
import sendEmail from '../utils/sendEmail.js'
import { newAccountInfoEmail } from './emails.js'

export function getUrl(req, res) {
    const offerId = parseInt(req.query.offerId)
    Profile.getAvailableByOfferId(offerId, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'Payment url not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results[0]))
    })
}

export function startPayment(req, res) {
    const offerId = parseInt(req.body.offerId)
    Profile.getAvailableByOfferId(offerId, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'Payment url not found', 'statusCode': 404 }, res)
        let url = results[0]['payment_url']
        const token = crypto.randomBytes(16).toString('base64')
        const phone = req.body.phone
        const query = `INSERT INTO pending_payment (token, phone) VALUES(?, ?)`
        db.query(query, [token, phone], function (err) {
            if (err) return error(err, res)
            url += `?pay_token=${token}`
            res.end(JSON.stringify({ 'url': url }))
        })
    })
}


export function finishPayment(req, res) {
    const body = req.body
    const profileId = parseInt(body.product_name.split('=')[1])
    if (!body.price || body.price === '0')
        return error({ 'mess': 'Subscription refunded', 'statusCode': 400 }, res)
    // if user finish subscription and i sent it to resupscibe 
    const oldUser = body.url_params?.user_id != null
    if (oldUser) {
        const userId = parseInt(body.url_params.user_id)
        User.update(userId,
            { 'lastPayTime': new Date(), 'profileId': profileId },
            function (err) {
                if (err) return error(err, res)
                Profile.update(profileId,
                    { 'used': true },
                    function (err) {
                        if (err) return error(err, res)
                        User.findById(userId, function (err, results) {
                            if (err) return error(err, res)
                            const username = body.email.split('@')[0]
                            const user = results[0]
                            sendEmail(user.email,
                                newAccountInfoEmail({
                                    'username': username,
                                    'email': user.account_email,
                                    'password': user.account_password,
                                    'profile': user.profile_name,
                                    'pinCode': user.profile_pin_code
                                }),
                                function (err) {
                                    if (err) return error(err, res)
                                    res.writeHead(204)
                                    res.end()
                                })
                        })
                    })
            })
    } else {
        User.findByProfileId(profileId, function (err, results) {
            if (err) return error(err, res)
            // check if is new user
            if (results.length === 0) {
                const token = body.url_params.pay_token
                const query = 'SELECT phone FROM pending_payment WHERE token = ?'
                db.query(query, [token], function (err, results) {
                    if (err) return error(err, res)
                    body.type = 'card'
                    body.phone = results[0].phone
                    body.profileId = profileId
                    req.body = body
                    createUser(req, res)
                })
            } else {
                // if is old user and is subscription request for every month
                User.update(
                    results[0]['id'],
                    { 'lastPayTime': new Date() },
                    function (err) {
                        if (err) return error(err, res)
                        res.writeHead(204)
                        res.end()
                    }
                )
            }
        })
    }
}