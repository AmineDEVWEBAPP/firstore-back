import crypto from 'crypto'

export default function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync(password, salt, 32).toString('hex')
    return { salt, hash }
}