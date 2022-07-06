const jwt = require('jsonwebtoken');

module.exports = async function (payload, password) {
    const token = jwt.sign(payload, password, { expiresIn: '1h' });
    return token;
}