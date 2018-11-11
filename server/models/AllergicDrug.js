const mongoose = require("mongoose");
const AllergicDrugSchema = mongoose.Schema({
    PatientID: String,
    GPName: String,
    GPID: String,
    RXCUI: String
})

module.exports = mongoose.model('AllergicDrug', AllergicDrugSchema)
