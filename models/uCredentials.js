const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var Users = mongoose.model('Users', userSchema);
module.exports = Users;