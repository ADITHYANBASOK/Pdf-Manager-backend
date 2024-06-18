const mongoose = require('mongoose')

const schema = mongoose.Schema

const ExtractSchema = new schema({
    loginid:{type:mongoose.Types.ObjectId,ref:"login_tbs"},
    pdf: String,
    token: String
})

const ExtractModel = mongoose.model('Extractpdf_tb',ExtractSchema)

module.exports = ExtractModel