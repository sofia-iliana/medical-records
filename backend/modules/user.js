const mongoose = require("mongoose");
const db = require("./connection");

const User = mongoose.model("user", {
  fullName: String,
  email: String,
  password: String,
  phone: String,
  socialSecNum: String,
  dateOfBirth: String,
  role: String,
});

module.exports = User;
