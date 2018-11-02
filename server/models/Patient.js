const mongoose = require("mongoose");
const patientSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    PatientID : String ,
    Firstname : String ,
    Lastname : String
})

module.exports = mongoose.model('Patient',patientSchema)
