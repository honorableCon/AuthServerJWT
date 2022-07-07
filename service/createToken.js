const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_RSA_PRIVATE_KEY;
const expirationTime = process.env.JWT_EXPIRATION_TIME;

module.exports = async function (payload) {
    const token = jwt.sign(payload, privateKey, {
        algorithm:'RS256', 
        expiresIn: expirationTime
    });
    return token;
}