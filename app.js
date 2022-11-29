const redis = require('redis')

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://admin:admin@mongo:27017/"

const REDIS_USER = 'admin'
const REDIS_PASSWORD = 'admin'
const REDIS_PORT = 6379

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const client = redis.createClient({
  url: 'redis://default:admin@redis:6379/'
});

client.on('error', (err) => console.log('Redis Client Error', err));

// (async () => {
//   await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
//   await client.disconnect();
// })()

const app = express();

// app.use(function(req, res, next) {
//   client.connect();
//   req['redis'] = client;
//   next();
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 3000;

require("./app/routes/app.routes.js")(app, client);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
