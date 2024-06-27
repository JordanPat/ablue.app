require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose'); 
const cors = require('cors');

const Exercise = require("./models/exercises.model");
const User = require("./models/users.model");
const { uri, DEV_PORT } = require('./config/db.config'); 
const app = express();
const port = DEV_PORT || 5000;

//middleware
app.use(logger); // enableing logger function to all of server also can use router.use() for specific routes
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// router for all urls starting with '/api/Users'
const usersRouter = require("./routes/users.routes")
app.use("/api/users", usersRouter)

const exercisesRouter = require("./routes/exercises.routes")
app.use("/api/exercises", exercisesRouter)

// logger middleware for outputting original url to console
function logger(req, res, next) {
  console.log("-LOG:", req.originalUrl)
  next()
}

app.get('/', async (req,res)=>{
  console.log("new ping");
  // const user = await User.find();
  // const user = await User.create({
  //   fname:"garr",
  //   lname:"barr",
  //   email:"barr@gbarr.com",
  //   passwordHash:"password1",
  //   username: "garr1",
  //   age: 24
  // })
  // console.log("response: ", user)
  // res.send(user)
});

console.log("uri: ", uri)
// MongoDB connection
mongoose.connect( uri, {})
.then(() => {
  console.log('MongoDB connected');

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
