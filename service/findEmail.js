const mongodb = require('../config/mongodb');

module.exports = async function findEmail(email) {
    const isExist = await mongodb()
        .collection('users')
        .findOne({ email });

    return isExist || false;
}