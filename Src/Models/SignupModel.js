const mongoose = require('mongoose')

const schema = mongoose.Schema

const SignUpSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"Login_tb"},
    name:{type:String},
})

const SignUpModel = mongoose.model('SignUp_tb',SignUpSchema)

module.exports = SignUpModel