import hashPassword from '../utils/hashPassword.js'
import error from '../utils/error.js'
import getIp from '../utils/getIp.js'
import db from '../config/db.js'

export function registerAdmin(req, res) {
    const { email, password } = req.body
    const fullName = email.split('@')[0]
    const { salt, hash } = hashPassword(password)
    db.pool.getConnection(function (err, conn) {
        if (err) return error(err, res)
        conn.beginTransaction(function (err) {
            if (err) return error(err, res)
            const createAdminQuery = 'INSERT INTO admins (email,full_name,password_hash,password_salt) VALUES (?,?,?,?)'
            const adminValues = [email, fullName, hash, salt]
            db.query(conn, createAdminQuery, adminValues, function (err, result) {
                if (err) return conn.rollback(() => error(err, res))
                const id = result.insertId
                const userAgent = req.headers['user-agent']
                const ip = getIp(req)
                const expiredAt = req.session.cookie['_expires']
                const sessionId = req.sessionID
                const createSessionQuery = 'INSERT INTO admin_sessions (id, admin_id, ip_address, user_agent, expired_at) VALUES(?, ?, ?, ?, ?)'
                const sessionValues = [sessionId, id, ip, userAgent, expiredAt]
                db.query(conn, createSessionQuery, sessionValues, function (err) {
                    if (err) return conn.rollback(() => error(err, res))
                    conn.commit(function (err) {
                        if (err) return conn.rollback(() => error(err, res))
                        req.session.admin = { 'id': id }
                        res.writeHead(201)
                        res.end(JSON.stringify({ 'status': 'success' }))
                    })
                })
            })
        })
    })
}

