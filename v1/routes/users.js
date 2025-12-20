import express from 'express'
import { createUser, getUserById, getUsers, updateUser } from '../controller/users.js'
import authJWT from "../middlewares/admin/authJWT.js";
import strictArgs from '../middlewares/strictArgs.js'
import validUserParams from '../middlewares/user/validUserParams.js';


const router = express.Router()
export default router

router.use(authJWT)

router.post('/', [
    strictArgs({ 'profileId': 'number', 'phone': 'string', 'type': 'string' }),
    strictArgs({ 'email': 'string', 'active': 'boolean' }, false),
    validUserParams
], createUser)

router.put('/:id',
    [
        strictArgs({
            'profileId': 'number',
            'email': 'string',
            'phone': 'string',
            'type': 'string',
            'lastPayTime': 'string',
            'active': 'boolean'
        }, false, { atLeastOne: true }),
        validUserParams
    ],
    updateUser
)

router.get('/',getUsers)

router.get('/:id',getUserById)

