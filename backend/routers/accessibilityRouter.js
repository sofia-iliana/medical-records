const router = require("express").Router();
const accessibilityController = require("../controllers/accessibilityController");

router.post("/request/create", accessibilityController.createRequest);
router.get("/request/get/:userId", accessibilityController.getRequestsForUser);
router.get(
  "/request/getEntry/:userId/:doctorId",
  accessibilityController.getRequest
);
router.get(
  "/request/getForDoctor/:doctorId",
  accessibilityController.getRequestsDoctorSide
);
router.delete("/request/delete/:id", accessibilityController.deleteRequest);
router.put("/request/access/:id", accessibilityController.giveAccess);

module.exports = router;
