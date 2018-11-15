const mongoose = require("mongoose");
const DrugHistorySchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String,
    StartDate: String,
    Duration: String,
    Status: String,
    GPName : String,
    GPID: String,
    RXCUI: String,
    Dosage: String,
    Frequency: String,
    Description: String
})

module.exports = mongoose.model('DrugHistory', DrugHistorySchema)
