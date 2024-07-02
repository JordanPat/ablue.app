module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  app.get('/', async (req, res) => {
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
  app.get('/1', async (req, res) => {
    console.log("inside app.get('/Exercises'...)");
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

  // app.use('/api/tutorials', router);
};