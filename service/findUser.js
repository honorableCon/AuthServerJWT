const bcrypt = require('bcrypt');
const mongodb = require('../config/mongodb');

module.exports = async function findUser({email, password}) {
    const user = await mongodb()
        .collection('users')
        .findOne({email});

    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return user;
        }
    }
    return null;
}