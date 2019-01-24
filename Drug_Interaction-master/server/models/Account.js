const mongoose = require("mongoose");
const AccountSchema = mongoose.Schema({
    ID: String,
    Username: String,
    Password: String,
    Email: String,
    AccountType: String,
    RegisterStatus: String
})

module.exports = mongoose.model('Account', AccountSchema)
