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