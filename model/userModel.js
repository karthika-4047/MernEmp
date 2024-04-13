const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  Name: String,
  Phone: Number,
  Email: String,
  Username: String,
  Password: String,
  
});

const userModel = mongoose.model("employee", Schema);
module.exports = userModel;
