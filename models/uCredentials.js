const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
});

var Users = mongoose.model('Users', userSchema);
module.exports = Users;