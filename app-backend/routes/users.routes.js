
const { client } = require('../config/db.config');
const router = require("express").Router();
const User = require("../models/users.model");


router.get('/', async (req, res) => {
  console.log("inside app.get('/Users'...)");
  try {
    // const database = client.db('workouts'); // Replace with your database name
    // const exerciseCollection = database.collection('Users'); // Replace with your collection name
    // const users = await exerciseCollection.find().toArray();

    const users = await User.find();
    res.json(users);
  } 
  catch (error) {
    console.error('Error fetching Exercises:', error);
    res.status(500).json({ error: 'Failed to fetch Exercises' });
  }
});

router.get('/Jordan', async (req, res) => {
  console.log("inside app.get('/Users/1'...)");
  try {
    const database = client.db('workouts'); // Replace with your database name
    const exerciseCollection = database.collection('Users'); // Replace with your collection name

    const users = await exerciseCollection.find({"fname":"Jordan"}).toArray();
    res.json(users);
  } 
  catch (error) {
    console.error('Error fetching Exercises:', error);
    res.status(500).json({ error: 'Failed to fetch Exercises' });
  }
});

router.route("/:id")
  .get((req,res)=>{
    res.send(`Get User with ID: ${req.params.id}`)
  }).post((req,res)=>{
    res.send('Create User')
  })
  .put((req,res)=>{
    res.send(`Put User with ID: ${req.params.id}`)
  })
  .delete((req,res)=>{
    res.send(`Delete User with ID: ${req.params.id}`)
});

// (middleware after req running before res sends) runs for id param passed into uri and then passes id through to next function aka router.route().get
router.param("id", (req,res,next,id) => { 
  console.log("id:", id);
  next();
});


module.exports = router