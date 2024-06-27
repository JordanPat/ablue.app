const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DEV_PORT,
  DB_NAME,
} = process.env;

// require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://dbuser:"+DB_PASSWORD+"@cluster0.evadi6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/workouts?retryWrites=true&w=majority&appName=Cluster0`;

console.log("dbconfig uri: ",uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = { client, uri, DEV_PORT };

