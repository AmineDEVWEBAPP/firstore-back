import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    'windowMs': 120 * 60 * 1000,
    'max': 5,
    'message': 'Too many request try again later'
})

export default loginLimiter