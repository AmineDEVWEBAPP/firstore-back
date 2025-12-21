import db from '../config/db.js';
import Profile from '../model/profile.js';
import User from '../model/user.js';
import error from '../utils/error.js';
import mailer from 'nodemailer'

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

export function sendEmail(req, res) {
    function sendEmail(email, html, callback) {
        const transporter = mailer.createTransport({
            'service': 'gmail',
            'auth': {
                'user': 'mohammedaminkhadir@gmail.com',
                'pass': 'pjjz akqm avca ijqn'
            }
        })

        const options = {
            'from': 'Firstore',
            'to': email,
            'subject': 'Netflix account',
            'html': html
        }
        transporter.sendMail(options, callback)
    }
    const id = parseInt(req.params.id)
    User.findById(id, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'User not found', 'statusCode': 404 }, res)
        const user = results[0]
        const email = user['email']
        const name = email.split('@')[0]
        Profile.getAvailableByOfferName(user.offer_name, function (err, results) {
            if (err) return error(err, res)
            if (results.length === 0)
                return error({ 'mess': `Payment url not found in ${user.offer_name} offer`, 'statusCode': 404 }, res)
            let paymentUrl = results[0]['payment_url']
            paymentUrl += `?user_id=${user.id}`
            const htmlContent = `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background-color: #007BFF; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Firstore</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px; color: #333;">مرحبا , ${name}</p>
        <p style="font-size: 16px; color: #333;">
          لقد انتهى اشتراكك الشهري في خدمتنا, المرجو اعادة الاشتراك للحصول على حساب Netflix جديد
        </p>
        <a href="${paymentUrl}" 
           style="display: inline-block; background-color: #FF6F00; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin-top: 20px;">
          اشتراك
        </a>
        <p style="font-size: 14px; color: #777; margin-top: 30px;">
          يمكنك ايضا استعمال هاذا الرابط للاشتراك<br>
          <a href="${paymentUrl}" style="color: #007bff;">${paymentUrl}</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
        &copy; 2025 Firstore. All rights reserved.
      </div>
    </div>
  </div>
        `
            sendEmail(email, htmlContent, err => {
                if (err) return error(err, res)
                res.writeHead(204)
                res.end()
            })
        })
    })
}
