import Profile from "../../model/profile.js"
import error from "../../utils/error.js"

export default function availableProfile(req, res, next) {
    const { profileId } = req.body
    Profile.findById(profileId, function (err, results) {
        if (err) return error(err, res)
        if (results.length === 0)
            return error({ 'mess': 'Profile not found', 'statusCode': 404 }, res)
        if (results[0].used === 1)
            return error({ 'mess': 'Profile already used', 'statusCode': 400 }, res)
        next()
    })
}