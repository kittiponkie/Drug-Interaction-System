const mongoose = require("mongoose");
const PharmacistRelationSchema = mongoose.Schema({
    PatientID: String , 
    PharmacistID: String,
    Prefix: String,
    PharmacistReq: String,
})

module.exports = mongoose.model('PharmacistRelation', PharmacistRelationSchema)