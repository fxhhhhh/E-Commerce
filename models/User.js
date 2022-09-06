const mongoose = require('mongoose')
const validator = require('validator')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true ,'please provide name'],
        maxLength : 50,
        minLength : 3,
    },
    email: {
        type: String,
        require: [true ,'please provide email'],
        validate:{
            validator: validate.isEmail,
            message:'provide a valid Email'
        }
    },
    password : {
        type: String,
        require: [true ,'please provide password'],
        maxLength : 50,
        minLength : 3,
    },
    role: {
        type: String,
        enum:['user','admin'],
        default:'user',
    },
})

module.exports = mongoose.model('User',UserSchema)