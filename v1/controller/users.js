import db from '../config/db.js';
import User from '../model/user.js';
import error from '../utils/error.js';

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
                        conn.release()
                        res.writeHead(201)
                        res.end(JSON.stringify(body))
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

// {
//   seller_id: 'pYkqbqsHc5eThbZnSdzP5A==',
//   product_id: 'BvkcccRWWFcR5r2Q1EghUQ==',
//   product_name: 'Netflix Account id=23',
//   permalink: 'mlzte',
//   product_permalink: 'https://mohammedamine78.gumroad.com/l/mlzte',
//   short_product_id: 'mlzte',
//   email: 'mohammedaminekhadir6@gmail.com',
//   price: '5800',
//   gumroad_fee: '630',
//   currency: 'usd',
//   quantity: '1',
//   discover_fee_charged: 'false',
//   can_contact: 'true',
//   referrer: 'direct',
//   card: { visual: '', type: '', bin: '', expiry_month: '', expiry_year: '' },
//   order_number: '334075201',
//   sale_id: 'pGeHOBuOSVohyEPnAS6urQ==',
//   sale_timestamp: '2025-12-19T23:56:26Z',
//   purchaser_id: '5783166376',
//   subscription_id: 'cmMhuzGgdER4yqCdoAmYgw==',
//   variants: { Tier: 'Untitled' },
//   test: 'true',
//   ip_country: 'Morocco',
//   recurrence: 'monthly',
//   is_gift_receiver_purchase: 'false',
//   refunded: 'false',
//   resource_name: 'sale',
//   disputed: 'false',
//   dispute_won: 'false'
// }