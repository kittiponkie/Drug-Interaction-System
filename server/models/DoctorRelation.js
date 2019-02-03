const mongoose = require("mongoose");
const DoctorRelationSchema = mongoose.Schema({
    PatientID: String,
    DoctorID: String
})

module.exports = mongoose.model('DoctorRelation', DoctorRelationSchema)
