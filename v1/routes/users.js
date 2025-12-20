import express from 'express'
import { createUser, getUserById, getUsers, updateUser } from '../controller/users.js'
import authJWT from "../middlewares/admin/authJWT.js";
import strictArgs from '../middlewares/strictArgs.js'
import validUserParams from '../middlewares/user/validUserParams.js';
import availableProfile from '../middlewares/user/availableProfile.js';


const router = express.Router()
export default router

router.use('/webhook', function (req, res) {
    console.log(req.body)
    res.end()
})

router.use(authJWT)

router.post('/', [
    strictArgs({ 'profileId': 'number', 'phone': 'string', 'type': 'string' }),
    strictArgs({ 'email': 'string' }, false),
    validUserParams,
    availableProfile
], createUser)

router.put('/:id',
    [
        strictArgs({
            'profileId': 'number',
            'email': 'string',
            'phone': 'string',
            'type': 'string',
            'lastPayTime': 'string'
        }, false, { atLeastOne: true }),
        validUserParams,
        availableProfile
    ],
    updateUser
)

router.get('/', getUsers)

router.get('/:id', getUserById)

