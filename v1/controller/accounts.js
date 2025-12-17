import Account from "../model/account.js";
import error from "../utils/error.js";

export function createAccount(req, res) {
    Account.create(req.body, function (err, result) {
        if (err.errno === 1452) return error({ 'mess': `Offer not found with this id = ${req.body.offerId}`, 'statusCode': 404 }, res)
        if (err) return error(err, res)
        console.log(result)
        res.end('{"status": "success"}')
    })
}