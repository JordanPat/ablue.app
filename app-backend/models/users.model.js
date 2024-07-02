const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
  email:
  fname: ,
  lname: ,
  age: ,
  passwordHash: ,
  username: ,
  createdAt: 
 */

  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},
const usersSchema = new Schema({
  email: { 
    type: String,
    maxLength: 50,
    minLength: 10,
    lowercase: true,
    unique: true
  },
  fname: { type: String, required: true },
  lname: { type: String, required: false },
  age: { 
    type: Number, 
    min:14,
    max:110
  },
  weight: { 
    type: Number, 
    min:80,
    max:500
  },
  passwordHash: {type: String, required: true},
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});

usersSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const getRandInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createRandUser = () => {
  const randId = getRandInt(1000, 9999);

  const newuser = new User({
    get email(){return this.username+"@mail.com"},
    fname: "newuser"+randId,
    lname: `${randId}`,
    age: getRandInt(14,110), 
    passwordHash: `${randId+getRandInt(100, 999)}`,
    username: "newuser"+randId,
  })
  return newuser
}

const User = mongoose.model('Users', usersSchema);

module.exports = { User, createRandUser};