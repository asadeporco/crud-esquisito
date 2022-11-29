const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  title: String,
  description: String,
  done: Boolean
});

module.exports = mongoose.model("App", AppSchema);