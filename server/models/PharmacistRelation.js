const mongoose = require("mongoose");
const PharmacistRelationSchema = mongoose.Schema({
    PatientID: String , 
    PharmacistID: String,
    Request:String
})

module.exports = mongoose.model('PharmacistRelation', PharmacistRelationSchema)