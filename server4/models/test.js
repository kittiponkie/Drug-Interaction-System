const mongoose = require("mongoose");
const testSchema = mongoose.Schema({
    PatientID : String ,
    Firstname : String ,
    Lastname : String
})

module.exports = mongoose.model('test',testSchema)
