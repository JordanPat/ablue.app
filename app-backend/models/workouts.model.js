const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},
const workoutsSchema = new Schema({
  date: { 
    type: Date,
    default: Date.now
  },
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
   }, 
  createdAt: {
    type: Date,
    default: () => { Date.now }
  },
  updatedAt: {
    type: Date,
    default: () => { Date.now }
  }
});

const workout = mongoose.model('Workouts', workoutsSchema);

module.exports = workout;