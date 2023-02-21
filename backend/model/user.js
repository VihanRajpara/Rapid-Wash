const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String,
    require:true
  },
  contact:{
    type:String,
    require:true
  },
  pincode:{
    type:String,
    require:true
  }
},
{
    timestamps:true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;