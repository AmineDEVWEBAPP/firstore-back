import crypto from 'crypto'

export default function verifyPassword(password, salt, hash) {
    const hashedPassword = crypto.scryptSync(password, salt, 32).toString('hex')
    return crypto.timingSafeEqual(
        Buffer.from(hashedPassword, 'hex'),
        Buffer.from(hash, 'hex')
    )

}