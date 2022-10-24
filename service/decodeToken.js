const jwt = require('jsonwebtoken');

module.exports = async function decodeToken(req) {
    const publicKey = process.env.JWT_RSA_PUBLIC_KEY;
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        return { status: true, data: jwt.verify(token, publicKey) };
    } catch (error) {
        return { status: false, error: error.message };
    }
}