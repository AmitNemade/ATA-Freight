const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetails = new Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    phone: String,
    uidai: String
})

module.exports = User = mongoose.model('UserInfo', UserDetails)