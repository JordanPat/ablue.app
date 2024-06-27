const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},
const usersSchema = new Schema({
  email: { 
    type: String,
    maxLength: 50,
    minLength: 10,
    lowercase: true 
  },
  fname: { type: String, required: true },
  lname: { type: String, required: false },
  age: { 
    type: Number, 
    min:14,
    max:110
  },
  passwordHash: {type: String, required: true},
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }
});

const User = mongoose.model('Users', usersSchema);

module.exports = User;