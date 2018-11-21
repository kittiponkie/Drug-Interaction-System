const mongoose = require("mongoose");
const DrugHistorySchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String,
    PharmacistID: String,
    StartDate: String,
    Duration: String,
    UsingStatus: String,
    DispendStatus: String,
    GPName : String,
    GPID: String,
    RXCUI: String,
    Dosage: String,
    Frequency: String,
    Times: String,
    Description: String
})

module.exports = mongoose.model('DrugHistory', DrugHistorySchema)
