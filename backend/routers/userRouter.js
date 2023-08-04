const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/user/signup", userController.userSignup);
router.post("/user/login", userController.userLogin);
router.post("/user/verify", userController.userVerify);
router.get("/user/ssn/:socialSecNum", userController.getUserBySSN);

module.exports = router;
