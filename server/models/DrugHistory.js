const mongoose = require("mongoose");
const DrugHistorySchema = mongoose.Schema({
    OrderID : String,
    PatientID : String,
    DoctorID : String,
    PharmacistID : String,
    OrderStartDate : String,
    DispendStartDate : String,
    Duration : String,
    UsingStatus : String,
    DispendStatus : String,
    DrugNo : String,
    GPName : String,
    RXCUI : String,
    Dosage  : String,
    Frequency : String,
    Times: String,
    Quantity: String,
    Dispend: String,
    Description: String
})

module.exports = mongoose.model('DrugHistory', DrugHistorySchema)