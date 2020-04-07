const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pnum: {
    type:Number,
    required: true
  },
  password:{
    type:String,
    required:true
  },

  date: {
    type: Date,
    default: Date.now
  },
  secretToken:{
    type:String,
    required:false
  },
  active:{
    type:Boolean

  }
});
// Model
const user = mongoose.model('user', userSchema);
module.exports = user;
