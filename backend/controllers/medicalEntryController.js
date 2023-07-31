const MedicalEntry = require("../modules/medicalEntry");
const cloudinary = require("../modules/cloudinary");

//create entry and save image in cloudinary
const createMedicalEntry = async (req, res) => {
  const {
    fullName,
    socialSecNum,
    userId,
    specialty,
    medicalReport,
    kindOfTest,
    date,
    img,
  } = req.body;

  try {
    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img, {
        upload_preset: "medicalRecords",
      });
      if (uploadRes) {
        const newEntry = new MedicalEntry({
          fullName,
          socialSecNum,
          userId,
          specialty,
          medicalReport,
          kindOfTest,
          date,
          img: uploadRes,
        });
        const savedEntry = await newEntry.save();
        res.send({ msg: "send successfully" });
      }
    } else {
      await MedicalEntry.create(req.body);
      res.send({ msg: "send successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get entries user's entries by userId
const getMedicalEntries = async (req, res) => {
  try {
    const entries = await MedicalEntry.find({
      userId: req.params.userId,
    });
    res.send(entries);
  } catch (error) {
    console.log(error);
  }
};

//get one entry by entry id
const getOneEntry = async (req, res) => {
  try {
    const entry = await MedicalEntry.findById({ _id: req.params.id });
    res.send(entry);
  } catch (error) {
    console.log(error);
  }
};

//delete entry and image from cloudinary

const deleteEntry = async (req, res) => {
  try {
    const entry = await MedicalEntry.findById({ _id: req.params.id });
    if (entry.img) {
      const imgId = entry.img.public_id;
      await cloudinary.uploader.destroy(imgId);
    }
    await MedicalEntry.deleteOne({ _id: req.params.id });
    res.send({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

//update entry
const editEntry = async (req, res) => {
  try {
    await MedicalEntry.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "Update saved" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMedicalEntry,
  getMedicalEntries,
  getOneEntry,
  editEntry,
  deleteEntry,
};
