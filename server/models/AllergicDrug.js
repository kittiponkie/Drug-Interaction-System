const mongoose = require("mongoose");
const AllergicDrugSchema = mongoose.Schema({
    PatientID: String,
    VTMName: String
})

module.exports = mongoose.model('AllergicDrug', AllergicDrugSchema)
