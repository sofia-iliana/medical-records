const Access = require("../modules/accessibility");

//get requests for user by user id
const getRequests = async (req, res) => {
  try {
    const user = await Access.find({
      userId: req.params.userId,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

//get requests for doctor by doctor id
const getRequestsDoctorSide = async (req, res) => {
  try {
    const doctor = await Access.find({
      doctorId: req.params.doctorId,
    });
    res.send(doctor);
  } catch (error) {
    console.log(error);
  }
};

//create a request from the doctor to the patient
const createRequest = async (req, res) => {
  try {
    const newAccess = await Access.create(req.body);
    res.send({ msg: "A request is send" });
  } catch (error) {
    console.log(error);
  }
};

//change th boolean to give permission
const giveAccess = async (req, res) => {
  try {
    await Access.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "Permission sent" });
  } catch (error) {
    console.log(error);
  }
};

//delete request
const deleteRequest = async (req, res) => {
  try {
    await Access.deleteOne({ _id: req.params.id });
    res.send({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRequests,
  getRequestsDoctorSide,
  createRequest,
  giveAccess,
  deleteRequest,
};
