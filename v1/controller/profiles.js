import Profile from "../model/profile.js";
import error from '../utils/error.js'

export function getProfiles(_, res) {
    Profile.findAll(function (err, results) {
        if (err) return error(err, res)
        res.end(JSON.stringify(results))
    })
}