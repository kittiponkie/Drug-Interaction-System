const mongoose = require("mongoose");
const InteractionListSchema = mongoose.Schema({
    Rxcui1: String,
    Drug1: String,
    Rxcui2: String,
    Drug2: String,
    Severity: String,
    Description: String
})

module.exports = mongoose.model('InteractionList', InteractionListSchema)