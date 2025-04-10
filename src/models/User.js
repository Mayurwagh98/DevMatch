const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
});

const UserModel = mongoose.model("Users", User);

module.exports = UserModel;
