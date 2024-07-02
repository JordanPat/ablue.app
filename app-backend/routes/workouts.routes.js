const express = require('express');
const router = express.Router();
const Workout = require('../models/workouts.model'); // Ensure the path to your Workout model is correct

// GET /api/workouts/ - Retrieve all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// POST /api/workouts/ - Create a new workout
router.post('/', async (req, res) => {
  const { name, date, userId } = req.body;

  try {
    const newWorkout = new Workout({
      name,
      date,
      userId
    });

    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts/:id - Retrieve a workout by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id - Update a workout by its ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, userId } = req.body;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { name, date, userId },
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(updatedWorkout);
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete a workout by its ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

module.exports = router;
