const MedicalEntry = require("../modules/medicalEntry");
const cloudinary = require("../modules/cloudinary");

const CreateMedicalEntry = async (req, res) => {
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
