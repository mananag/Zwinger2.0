const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
// const findOrCreate = require('findorcreate-promise');
const userSchema = new Schema({
  fname: {
    type: String,
    required: false
  },
  lname: {
    type: String,
    required:false
  },
  email: {
    type: String,
    required:false
  },
  pnum: {
    type:Number,
    required:false
  },
  password:{
    type:String,
    required:false
  },

  date: {
    type: Date,
    default: Date.now
  },
  secretToken:{
    type:String,
    required:false
  },
  googleId:{
    type: String,
    required:false
  },
  active:{
    type:Boolean

  }
});
userSchema.plugin(findOrCreate);
// userSchema.plugin(findOrCreate);
// Model
const user = mongoose.model('user', userSchema);
module.exports = user;
