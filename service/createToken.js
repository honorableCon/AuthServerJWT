const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_RSA_PRIVATE_KEY;
const passphrase = process.env.JWT_SECRET
const expirationTime = process.env.JWT_EXPIRATION_TIME;

module.exports = async function (payload) {
    const token = jwt.sign(payload, {key: privateKey, passphrase}, {
        algorithm:'RS256',
        expiresIn: expirationTime
    });
    return token;
}