import db from '../config/db.js'

const Orders = {}
export default Orders

Orders.findAll = function (callback) {
    const query = 'SELECT * FROM orders'
    db.query(query, [], function (err, results) {
        if (err) return callback(err)
        callback(null,results)
    })
}