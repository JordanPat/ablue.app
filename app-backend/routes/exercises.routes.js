
const { client } = require('../config/db.config');
const router = require("express").Router();
const Exercise = require("../models/exercises.model");


router.route('/')
  .get( async (req, res) => {
    console.log("inside router.get('/api/exercises'...)");
    try {
      // const database = client.db('workouts'); // Replace with your database name
      // const exerciseCollection = database.collection('Exercises'); // Replace with your collection name
      // const exercises = await exerciseCollection.find().toArray();

      const exercises = await Exercise.find();
      res.json(exercises);    
    } 
    catch (error) {
      console.error('Error fetching Exercises:', error);
      res.status(500).json({ error: 'Failed to fetch Exercises' });
    }
  })
  .post( async (req, res) => {
    try {
      console.log("req.body: ", req.body);
      const { description, modifier, exerciseName, tag } = req.body;
      const newExercise = new Exercise({ description, modifier, exerciseName, tag });
      
      const savedExercise = await newExercise.save();
      res.status(201).json(savedExercise);
    } catch (error) {
      console.error('Error adding exercise:', error);
      res.status(500).json({ error: 'Failed to add exercise' });
    }
  })

router.get('/1', async (req, res) => {
  console.log("inside app.get('/exercises/1'...)");
  try {
    const database = client.db('workouts'); // Replace with your database name
    const exerciseCollection = database.collection('Exercises'); // Replace with your collection name

    const exercises = await exerciseCollection.find({"exerciseName":"Bench Press"}).toArray();
    res.json(exercises);
  } 
  catch (error) {
    console.error('Error fetching Exercises:', error);
    res.status(500).json({ error: 'Failed to fetch Exercises' });
  }
});

// router.delete("/del/:id", async (req, res) => {
//   console.log("inside app.post('/api/Exercises/del'...)");
// });

// Handle PUT, POST, and DELETE requests for exercises by id
router.route('/:id')
  // get an existing exercise
  .get( async (req, res) => {
    console.log("inside app.get('/exercises/:id'...)");
    try {
      const { id } = req.params;
      console.log(`get exercise id: ${req.params.id}`)
      const exercises = await Exercise.findById(id);
      res.json(exercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      res.status(500).json({ error: 'Failed to fetch exercises' });
    }
  })
  // Update an existing exercise (PUT)
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { tags } = req.body;
      const updatedExercise = await Exercise.findByIdAndUpdate(
        id, 
        { $addToSet: { tag: { $each: tags } } }, 
        { new: true });

      if (!updatedExercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }

      res.json(updatedExercise);
    } catch (error) {
      console.error('Error updating exercise:', error);
      res.status(500).json({ error: 'Failed to update exercise' });
    }
  })  
  // Delete an existing exercise (DELETE)
  .delete(async (req, res) => {
    console.log("delete exercise by id")
    try {
      const { id, name } = req.params;
      const deletedExercise = await Exercise.findByIdAndDelete(id);

      if (!deletedExercise) {
        return res.status(404).json({ error: 'Exercise not found' });
      }

      res.status(200).json({ message: `Exercise ${deletedExercise.name} deleted successfully` });
    } catch (error) {
      console.error('Error deleting exercise:', error);
      res.status(500).json({ error: 'Failed to delete exercise' });
    }
  });

module.exports = router