const mongoose = require('mongoose')

const schema = mongoose.Schema

const UploadSchema = new schema({
    loginid:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    pdf: String,
    title: String,
    token:String
})

const UploadModel = mongoose.model('Uploadpdf_tb',UploadSchema)

module.exports = UploadModel