const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},
const exercisesSchema = new Schema({
  description: { type: String, required: true },
  modifier: { type: String, required: false },
  exerciseName: { type: String, required: true },
  tag: [{ type: String }]
});

const Exercise = mongoose.model('Exercises', exercisesSchema);

module.exports = Exercise;