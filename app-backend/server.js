require("dotenv").config();
const { client } = require('./config/db.config');
const port = process.env.PORT || 3000;

const express = require("express");

const app = express();
app.use(logger); // enableing logger function to all of server also can use router.use() for specific routes


app.get('/', async (req, res) => {
  console.log("inside app.get('/'...)");
  try {
    await client.connect();
    const result = await client.db("admin").command({ ping: 1 });
    res.send('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to connect to MongoDB');
  } finally {
    await client.close();
  }
});

// router for all urls starting with '/api/Users'
const userRouter = require("./routes/users.routes")
app.use("/api/users", userRouter)

const exerciseRouter = require("./routes/exercise.routes")
app.use("/api/exercises", exerciseRouter)

// logger middleware for outputting original url to console
function logger(req, res, next) {
  console.log("-LOG:", req.originalUrl)
  next()
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});