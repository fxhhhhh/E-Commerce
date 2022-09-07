const mongoose = require('mongoose')
const validator = require('validator')

const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true ,'please provide name'],
        maxLength : 50,
        minLength : 3,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
          validator: validator.isEmail,
          message: 'Please provide valid email',
        },
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
UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };
  
module.exports = mongoose.model('User',UserSchema)