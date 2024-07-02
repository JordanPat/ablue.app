const express = require('express');
const router = express.Router();
const WorkoutExercise = require('../models/workoutExercises.model'); // Ensure the path to your WorkoutExercise model is correct
const Workout = require('../models/workouts.model'); // Ensure the path to your Workout model is correct
const Exercise = require('../models/exercises.model'); // Ensure the path to your Exercise model is correct

// GET /api/workout-exercises/ - Retrieve all workout exercises
router.get('/', async (req, res) => {
  try {
    const workoutExercises = await WorkoutExercise.find();
    res.json(workoutExercises);
  } catch (error) {
    console.error('Error fetching workout exercises:', error);
    res.status(500).json({ error: 'Failed to fetch workout exercises' });
  }
});

// POST /api/workout-exercises/ - Create a new workout exercise
router.post('/', async (req, res) => {

  const { workoutId, exerciseId, sets, reps, weight, time, completed } = req.body;
  try {
    // Ensure the workout exists
    const workout = await Workout.findById(workoutId);
    console.log("workoutId for new workoutExercise: ", workoutId)
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Ensure the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    console.log("exerciseId for new workoutExercise: ", exerciseId)
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const newWorkoutExercise = new WorkoutExercise({
      workoutId,
      exerciseId,
      sets,
      reps,
      weight,
      time,
      completed
    });
    console.log("newWorkoutExercise: ", newWorkoutExercise);

    const savedWorkoutExercise = await newWorkoutExercise.save();
    res.status(201).json(savedWorkoutExercise);
  } catch (error) {
    console.error('Error creating workout exercise:', error); 
    res.status(500).json({ error: error.message });
  }
});

// GET /api/workout-exercises/:id - Retrieve a workout exercise by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const workoutExercise = await WorkoutExercise.findById(id);
    if (!workoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }
    res.json(workoutExercise);
  } catch (error) {
    console.error('Error fetching workout exercise:', error);
    res.status(500).json({ error: 'Failed to fetch workout exercise' });
  }
});

// PUT /api/workout-exercises/:id - Update a workout exercise by its ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { workoutId, exerciseId, sets, reps, weight, time, completed } = req.body;

  try {
    // Fetch the current workout exercise to compare lengths if needed
    const currentWorkoutExercise = await WorkoutExercise.findById(id);

    if (!currentWorkoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }

    // Ensure array lengths match sets value if they are provided
    const newSets = sets !== undefined ? sets : currentWorkoutExercise.sets;
    const newReps = reps !== undefined ? reps : currentWorkoutExercise.reps;
    const newWeight = weight !== undefined ? weight : currentWorkoutExercise.weight;
    const newTime = time !== undefined ? time : currentWorkoutExercise.time;

    if (newReps.length !== newSets || newWeight.length !== newSets || newTime.length !== newSets) {
      return res.status(400).json({ error: 'Array lengths for reps, weight, and time must match sets value' });
    }

    const updatedWorkoutExercise = await WorkoutExercise.findByIdAndUpdate(
      id,
      { workoutId, exerciseId, sets: newSets, reps: newReps, weight: newWeight, time: newTime, completed },
      { new: true, runValidators: true }
    );

    if (!updatedWorkoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }

    console.log("workoutExercise: ", updatedWorkoutExercise.id, " updated");

    res.json(updatedWorkoutExercise);
  } catch (error) {
    console.error('Error updating workout exercise:', error);
    res.status(500).json({ error: 'Failed to update workout exercise' });
  }
});

// DELETE /api/workout-exercises/:id - Delete a workout exercise by its ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkoutExercise = await WorkoutExercise.findByIdAndDelete(id);

    if (!deletedWorkoutExercise) {
      return res.status(404).json({ error: 'Workout exercise not found' });
    }

    res.json({ message: 'Workout exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout exercise:', error);
    res.status(500).json({ error: 'Failed to delete workout exercise' });
  }
});

module.exports = router;
