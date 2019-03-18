const mongoose = require("mongoose");
const DrugHistorySchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String,
    Duration: {
        year: String,
        month: String,
        day: String
    },
    DrugNo: String,
    GPName: String,
    RXCUI: String,
    Dosage: {
        dose: String,
        unit: String
    },
    Frequency: {
        mor: String,
        aft: String,
        eve: String,
        bed: String,
        before: String,
        after: String,
        symptoms: String
    },
    Times: String,
    Quantity: String,
    Dispend: String,
    Description: String
})

module.exports = mongoose.model('DrugHistory', DrugHistorySchema)