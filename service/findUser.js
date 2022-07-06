const User = require('../model/User');

module.exports = async function findUser({email, password}) {
    return User.where({email})
        .findOne({password})
        .exec();
}