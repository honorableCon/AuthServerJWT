const User = require('../model/User');
const bcrypt = require('bcrypt');

module.exports = async function findUser({email, password}) {
    const user = await User.findOne({email:email});

    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return user;
        }
    }
    return null;
}