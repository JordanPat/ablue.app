const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},

const durationSchema = new Schema({
  hours: { type: Number, required: false, min: 0 , default: 0},
  minutes: { type: Number, required: false, min: 0, default: 0},
  seconds: { type: Number, required: false, min: 0, default: 0}
}, { _id: false });
const userMaxesSchema = new Schema({
  max_10_rep: { type: Number, required: false, default: 0 },
  max_5_rep: { type: Number, required: false, default: 0 },
  max_3_rep: { type: Number, required: false, default: 0 },
  max_1_rep: {type: Number, required: false, default: 0},
  max_time: durationSchema,
  exerciseId: { type: Schema.Types.ObjectId,
    ref: 'Exercises', // Reference to the Workout model
    required: true},
  userId: { type: Schema.Types.ObjectId,
    ref: 'Users', // Reference to the Workout model
    required: true }
});

const userMax = mongoose.model('user_maxes', userMaxesSchema);

module.exports = userMax;