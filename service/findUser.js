const bcrypt = require('bcrypt');
const findEmail = require('./findEmail');

module.exports = async function findUser({email, password}) {
    const user = await findEmail(email);

    if(user){
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if(isMatch){
            return user;
        }
    }
    return null;
}