const redis = require('redis')

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MONGODB_URL = "mongodb://admin:admin@mongo:27017/"

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

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

let PORT = 3000;

require("./app/routes/app.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
