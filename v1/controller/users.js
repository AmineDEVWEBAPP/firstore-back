import db from '../config/db.js';
import Profile from '../model/profile.js';
import User from '../model/user.js';
import error from '../utils/error.js';
import sendEmail from '../utils/sendEmail.js';
import { updateAccountEmail as newAccountEmail, subscriptionEmail } from './emails.js';

export function createUser(req, res) {
    const body = req.body

    db.pool.getConnection(function (err, conn) {
        if (err) return error(err, res)

        conn.beginTransaction(err => {
            if (err) {
                conn.release()
                return error(err, res)
            }

            // insert user 
            User.create(conn, body, function (err, results) {
                if (err) return conn.rollback(function () {
                    conn.release()
                    error(err, res)
                })
                body.id = results.insertId
                body.createdAt = new Date()
                body.lastPayTime = new Date()

                // update profile
                const query = 'UPDATE profiles SET used = true WHERE id = ?'
                db.query(conn, query, [body.profileId], function (err) {
                    if (err) return conn.rollback(function () {
                        conn.release()
                        error(err, res)
                    })
                    conn.commit(err => {
                        if (err) return conn.rollback(function () {
                            conn.release()
                            error(err, res)
                        })
                        User.findById(body.id, function (err, results) {
                            if (err) return error(err, results)
                            const user = results[0]
                            conn.release()
                            if (!body.type || body.type !== 'card') {
                                res.writeHead(201)
                                res.end(JSON.stringify(user))
                                console.log(body)
                            } else {
                                const username = user.email.split('@')[0]
                                sendEmail(user.email,
                                    newAccountEmail({
                                        username: username,
                                        'email': user.account_email,
                                        'password': user.account_password,
                                        'profile': user.profile_name,
                                        'pinCode': user.profile_pin_code
                                    }),
                                    function (err) {
                                        if (err) return error(err, res)
                                        res.writeHead(201)
                                        res.end(JSON.stringify(user))
                                    })
                            }
                        })
                    })
                })
            })
        })
    })
}

export function updateUser(req, res) {
    const id = req.params.id
    const body = req.body
    User.update(id, body, function (err, results) {
        if (err) return error(err, res)
        if (results.affectedRows === 0)
            return error({ 'mess': 'User not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}

export function getUsers(_, res) {
    User.findAll(function (err, results) {
        if (err) return error(err, res)
        res.end(JSON.stringify(results))
    })
}

export function getUserById(req, res) {
    const id = req.params.id
    User.findById(id, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0) return error({ 'mess': 'User not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results[0]))
    })
}

export function sendUserEmail(req, res) {
    const id = parseInt(req.params.id)
    User.findById(id, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'User not found', 'statusCode': 404 }, res)
        const user = results[0]
        if (user.type === 'whatsapp')
            return error({ 'mess': 'User type is whatsapp he not have an email', 'statusCode': 400 }, res)
        const email = user['email']
        const name = email.split('@')[0]
        Profile.getAvailableByOfferName(user.offer_name, function (err, results) {
            if (err) return error(err, res)
            if (results.length === 0)
                return error({ 'mess': `Payment url not found in ${user.offer_name} offer`, 'statusCode': 404 }, res)
            let paymentUrl = results[0]['payment_url']
            paymentUrl += `?user_id=${user.id}`
            sendEmail(email,
                subscriptionEmail({ 'name': name, 'paymentUrl': paymentUrl }),
                err => {
                    if (err) return error(err, res)
                    res.writeHead(204)
                    res.end()
                })
        })
    })
}

export function getUsersNews(_, res) {
    User.news(function (err, results) {
        if (err) return error(err)
        if (results.length === 0) return error({ 'mess': 'Users not found', 'statusCode': 404 }, res)
        res.end(JSON.stringify(results[0]))
    })
}

export function deleteUser(req, res) {
    const id = parseInt(req.params.id)
    User.delete(id, function (err, results) {
        if (err) return error(err, res)
        if (results['affectedRows'] === 0) return error({ 'mess': 'User not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}