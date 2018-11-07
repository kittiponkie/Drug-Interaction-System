const mongoose = require("mongoose");
const PatientSchema = mongoose.Schema({
    PatientID: String,
    Prefix: String,
    Firstname: String,
    Lastname: String,
    Sex: String,
    DOB: String,
    Age: String,
    Email: String,
    Weight: String,
    Height: String,
    IDcardNumber: String,
    Status: String,
    Race: String,
    Nation: String,
    Religion: String,
    Bloodgroup: String,
    Address: String,
    Phone: String
})

module.exports = mongoose.model('PatientInfo', PatientSchema)
