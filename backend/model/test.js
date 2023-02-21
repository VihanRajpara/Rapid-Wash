const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    require:true
  }
},
{
    timestamps:true,
})

const Test = mongoose.model('Test', userSchema);

module.exports = Test;