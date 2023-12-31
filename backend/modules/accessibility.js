const mongoose = require("mongoose");
const db = require("./connection");

const Access = mongoose.model("access", {
  doctorName: { type: String, default: "" },
  doctorId: { type: String, default: "" },
  userName: { type: String, default: "" },
  userId: { type: String, default: "" },
  allow: {
    type: Boolean,
    default: false,
  },
  /* new: {
    type: Boolean,
    default: true,
  },*/
});

module.exports = Access;
