const mongoose = require("mongoose");
const db = require("./connection");

const Doctor = mongoose.model("doctor", {
  fullName: String,
  email: String,
  password: String,
  specialty: String,
  role: String,
});

module.exports = Doctor;
