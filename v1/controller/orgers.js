import Orders from '../model/orders.js'
import error from '../utils/error.js'

export function getOrders(_, res) {
    Orders.findAll(function (err, results) {
        if (err) return error(err, res)
        res.writeHead(200)
        res.end(JSON.stringify(results))
    })
}