const Doctor = require("../modules/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//sign up
const doctorSignup = async (req, res) => {
  const checkDoctor = await Doctor.findOne({ email: req.body.email });
  if (checkDoctor) {
    res.send({ msg: "You already have an account" });
    return;
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const doctor = {
        fullName: String,
        email: String,
        password: String,
        specialty: String,
      };
      const newDoctor = await Doctor.create(doctor);
      var token = jwt.sign({ id: newDoctor._id }, "medical");
      res.send({ token });
    });
  });
};

//log in
const doctorLogin = async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    bcrypt.compare(req.body.password, doctor.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ id: doctor._id }, "medical");
        res.send({ token });
      } else {
        res.send({ msg: "wrong password" });
      }
    });
  } else {
    res.send({ msg: "Wrong email" });
  }
};

//verify
const doctorVerify = async (req, res) => {
  if (!req.body.token) {
    res.send({ msg: "try again" });
  }
  try {
    const payload = jwt.verify(req.body.token, "medical");
    if (payload) {
      const doctor = await Doctor.findOne({ _id: payload.id });
      if (doctor) {
        res.send(doctor);
      } else {
        res.send({ msg: "Invalid token" });
      }
    } else {
      res.send({ msg: "Invalid token" });
    }
  } catch (err) {
    res.send({ msg: "Invalid token" });
  }
};

module.exports = {
  doctorSignup,
  doctorLogin,
  doctorVerify,
};
