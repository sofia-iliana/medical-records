const User = require("../modules/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//sign up
const userSignup = async (req, res) => {
  const checkUser = await User.findOne({
    email: req.body.email,
  });
  if (req.body.role !== "patient") {
    res.send({ msg: "Select sign up as patient" });
    return;
  }
  if (checkUser) {
    res.send({ msg: "You already have an account" });
    return;
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        socialSecNum: req.body.socialSecNum,
        dateOfBirth: req.body.dateOfBirth,
        role: req.body.role,
      };
      const newUser = await User.create(user);
      var token = jwt.sign({ id: newUser._id }, "medical");
      res.send({ token });
    });
  });
};

//log in
const userLogin = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    if (user.role === "patient") {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign({ id: user._id }, "medical");
          res.send({ token });
        } else {
          res.send({ msg: "wrong password" });
        }
      });
    } else {
      res.send({ msg: "Incorrect input values" });
    }
  } else {
    res.send({ msg: "Wrong email" });
  }
};

//verify
const userVerify = async (req, res) => {
  if (!req.body.token) {
    res.send({ msg: "try again" });
  }
  try {
    const payload = jwt.verify(req.body.token, "medical");
    if (payload) {
      const user = await User.findOne({ _id: payload.id });
      if (user) {
        if (user.role === "patient") {
          res.send(user);
        } else {
          res.send({ msg: "Invalid token" });
        }
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

//get user by social security number
const getUserBySSN = async (req, res) => {
  try {
    const user = await User.find({
      socialSecNum: req.params.socialSecNum,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  userVerify,
  getUserBySSN,
};
