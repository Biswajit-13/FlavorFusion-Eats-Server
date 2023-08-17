const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username:{type:String, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address:{type:String, required:true},
  pin:{type:String,required:true},
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  otp:{type:Number},

});

module.exports = mongoose.model('User', usersSchema);
