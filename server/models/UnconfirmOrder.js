const mongoose = require("mongoose");
const UnconfirmOrderSchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String,
    Duration: {
        year: String,
        month: String,
        day: String
    },
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
    Description: String
})

module.exports = mongoose.model('UnconfirmOrder', UnconfirmOrderSchema)
