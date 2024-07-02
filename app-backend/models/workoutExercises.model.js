const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  // validate:{
  //   validator: v => v % 2 === 0,
  //   message: props => `${props.value} is not an even number`
  // }},
const durationSchema = new Schema({
  hours: { type: Number, required: true, min: 0 },
  minutes: { type: Number, required: true, min: 0 },
  seconds: { type: Number, required: true, min: 0 }
}, { _id: false });

const workoutExercisesSchema = new Schema({
  workoutId: {
    type: Schema.Types.ObjectId,
    ref: 'Workout', // Reference to the Workout model
    required: true
  },
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise', // Reference to the Exercise model
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: [{
    type: Number,
    required: true
  }],
  weight: [{
    type: Number,
    required: true
  }],
  time: [durationSchema],
  completion: {
    type: String,
    enum: ['incomplete', 'partially complete', 'complete'],
    required: true,
    default: 'incomplete'
  }
});

workoutExercisesSchema.pre('save', function(next) {
  console.log("array length check");
  if (this.reps.length !== this.sets) {
    console.log('Reps array length must match the sets value. sets: ', this.sets, " reps.length: ", this.reps.length);
    return next(new Error(`Reps array length must match the sets value. sets: ${this.sets}, reps.length: ${this.reps.length}`));
  }
  if (this.weight.length !== this.sets) {
    console.log('Reps array length must match the sets value. sets: ', this.sets, " weight.length: ", this.weight.length);
    return next(new Error(`Weight array length must match the sets value. sets: ${this.sets}, weight.length: ${this.weight.length}`));
  }
  if (this.time.length !== this.sets) {
    console.log('Reps array length must match the sets value. sets: ', this.sets, " time.length: ", this.time.length);
    return next(new Error(`Time array length must match the sets value. sets: ${this.sets}, time.length: ${this.time.length}`));
  }
  next();
});

const workoutExercise = mongoose.model('workout_Exercises', workoutExercisesSchema);

module.exports = workoutExercise;