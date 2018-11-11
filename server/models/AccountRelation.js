const mongoose = require("mongoose");
const AccountRelationSchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String,
    Date: String,
    PatientReq: String,
    DoctorReq: String,
})

module.exports = mongoose.model('AccountRelation', AccountRelationSchema)
