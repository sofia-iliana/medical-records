const router = require("express").Router();
const doctorController = require("../controllers/doctorController");

router.post("/doctor/signup", doctorController.doctorSignup);
router.post("/doctor/login", doctorController.doctorLogin);
router.post("/doctor/verify", doctorController.doctorVerify);

module.exports = router;
