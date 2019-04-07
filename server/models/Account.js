const mongoose = require("mongoose");
const AccountSchema = mongoose.Schema({
    ID: String,
    Username: String,
    Password: String,
    Email: String,
    AccountType: String, // "Doctor" ,"Pharmacist" ,"Patient" ,"Admin"
    RegisterStatus: String, // "0" = not confirm by admin,"1" = ready to use , "2" = reject by admin
    ActiveStatus: String // "0" = not active,"1" = active
})

module.exports = mongoose.model('Account', AccountSchema)
