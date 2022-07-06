const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = async function (payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
}