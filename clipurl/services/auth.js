const jwt = require('jsonwebtoken')
const secret = 'IOU@*(#HR@IUH$FI'

const generateJWT = async (data) => {
    return jwt.sign(data, secret)
}

const verifyJWT = async (token) => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return false
    }
}

module.exports = { generateJWT, verifyJWT }