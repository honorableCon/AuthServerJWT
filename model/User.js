const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: String,
    status: Boolean
});

module.exports = mongoose.model('User', UserSchema);

