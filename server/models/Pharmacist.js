const mongoose = require("mongoose");
const PharmacistSchema = mongoose.Schema({
    PharmacistID: String,
    Prefix: String,
    Firstname: String,
    Lastname: String,
    Email: String,
    Department: String,
    Sex: String,
    IDcardNumber: String,
    Address: String,
    Phone: String
})

module.exports = mongoose.model('PharmacistInfo', PharmacistSchema)