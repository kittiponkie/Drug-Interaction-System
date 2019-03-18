const mongoose = require("mongoose");
const UnconfirmOrderSchema = mongoose.Schema({
    PatientID: String,
    VTMName: String
})

module.exports = mongoose.model('UnconfirmOrder', UnconfirmOrderSchema)
