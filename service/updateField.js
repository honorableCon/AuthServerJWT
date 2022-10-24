const mongodb = require('../config/mongodb');

module.exports = async function updateField(option) {
    let user = await mongodb()
        .collection('users')
        .updateOne({ [Object.keys(option)[0]]: option[Object.keys(option)[0]] }, { $set: { [Object.keys(option)[1]]: option[Object.keys(option)[1]] } });
    return user;
}