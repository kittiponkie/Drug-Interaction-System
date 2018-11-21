const mongoose = require("mongoose");
const DoctorSchema = mongoose.Schema({
    DoctorID: String,
    Prefix: String,
    Firstname: String,
    Lastname: String,
    Email: String,
    Department: String,
    Ward: String,
    Sex: String,
    IDcardNumber: String,
    Address: String,
    Phone: String
})

module.exports = mongoose.model('DoctorInfo', DoctorSchema)
