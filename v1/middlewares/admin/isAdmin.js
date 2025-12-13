import Admin from "../../model/admin.js"
import error from "../../utils/error.js"

export default function isAdmin(req, res, next) {
    if (!req.body) return notFound(res)
    const email = req.body.email
    if (!email) return notFound(res)
    Admin.findByEmail(email, function (err, result) {
        if (err) return notFound(res)
        const adminEmail = result['email']
        if (adminEmail !== email) return notFound(res)
        next()
    })
}


function notFound(res){
    error({'mess':'not found','statusCode':404},res)
}