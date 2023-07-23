const mongoose = require("mongoose");
const db = require("./connection");

const MedicalEntry = mongoose.model("medicalEntry", {
  fullName: String,
  socialSecNum: String,
  userId: String,
  specialty: String,
  medicalReport: String,
  kindOfTest: String,
  date: String,
  img: Object,
});

module.exports = MedicalEntry;
