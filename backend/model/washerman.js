const mongoose = require('mongoose');
// const { default: Washerman } = require('../../frontend/src/pages/Washerman');
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
  city:{
    type:String,
    require:true
  },
  pincode:{
    type:String,
    require:true
  },
  shopname:{
    type:String,
    require:true
  },
  contact:{
    type:String,
    require:true
  },
  cost:{
    type:String,
    require:true
  }
},
{
    timestamps:true,
})

const Washerman = mongoose.model('Washerman', userSchema);

module.exports = Washerman;