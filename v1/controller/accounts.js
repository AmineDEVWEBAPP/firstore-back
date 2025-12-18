import Account from "../model/account.js";
import error from "../utils/error.js";

export function createAccount(req, res) {
    Account.create(req.body, function (err, result) {
        if (err && err.errno === 1452) return error({ 'mess': `Offer not found with this id = ${req.body.offerId}`, 'statusCode': 404 }, res)
        if (err) return error(err, res)
        const account = {
            'id': result.insertId,
            'email': req.body.email,
            'password': req.body.password,
            'itWorks': true,
            'createdAt': new Date()
        }
        if (req.body.offerId) account.offerId = req.body.offerId
        res.writeHead(201)
        res.end(JSON.stringify(account))
    })
}

export function deleteAccount(req, res) {
    const id = req.params.id
    Account.delete(id, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Account not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}

export function updateAccount(req, res) {
    const id = req.params.id
    Account.update(id, req.body, function (err, result) {
        if (err) return error(err, res)
        if (result.affectedRows === 0) return error({ 'mess': 'Account not found', 'statusCode': 404 }, res)
        res.writeHead(204)
        res.end()
    })
}

export function getAccounts(_, res) {
    Account.findAll(function (err, results) {
        if (err) return error(err, res)
        res.end(JSON.stringify(results))
    })
}