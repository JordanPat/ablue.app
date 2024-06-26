
const { client } = require('../config/db.config');
const router = require("express").Router();

router.get('/', async (req, res) => {
  console.log("inside app.get('/Exercises'...)");
  try {
    const database = client.db('workouts'); // Replace with your database name
    const exerciseCollection = database.collection('Exercises'); // Replace with your collection name

    const users = await exerciseCollection.find().toArray();
    res.json(users);
  } 
  catch (error) {
    console.error('Error fetching Exercises:', error);
    res.status(500).json({ error: 'Failed to fetch Exercises' });
  }
});

router.get('/1', async (req, res) => {
  console.log("inside app.get('/Exercises/1'...)");
  try {
    const database = client.db('workouts'); // Replace with your database name
    const exerciseCollection = database.collection('Exercises'); // Replace with your collection name

    const users = await exerciseCollection.find({"exerciseName":"Bench Press"}).toArray();
    res.json(users);
  } 
  catch (error) {
    console.error('Error fetching Exercises:', error);
    res.status(500).json({ error: 'Failed to fetch Exercises' });
  }
});

module.exports = router