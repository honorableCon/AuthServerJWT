const mongodb = require('../config/mongodb');
const bcrypt = require('bcrypt');

module.exports = async function insertUser({email, password, role, status}) {
    const isExist = await mongodb()
        .collection('users')
        .findOne({email});

    if(isExist){
        return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await mongodb()
        .collection('users')
        .insertOne({email, hashedPassword, role, status});
    
    return user;
}