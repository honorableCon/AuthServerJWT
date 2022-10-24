const bcrypt = require('bcrypt');
const mongodb = require('../config/mongodb');

module.exports = async function insertUser({email, password, role, status}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await mongodb()
        .collection('users')
        .insertOne({email, hashedPassword, role, status});

    return user;
}