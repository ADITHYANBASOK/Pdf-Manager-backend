const mongoose = require('mongoose')

const schema = mongoose.Schema

const LoginSchema = new schema({
    email:{type:String},
    password:{type:String},       
})

const LoginModel = mongoose.model('Login_tb',LoginSchema)

module.exports = LoginModel