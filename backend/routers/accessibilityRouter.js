const router = require("express").Router();
const accessibilityController = require("../controllers/accessibilityController");

router.post("/request/create", accessibilityController.createRequest);
router.get("/request/get/:userId", accessibilityController.getRequests);
router.delete("/request/delete/:id", accessibilityController.deleteRequest);
router.put("/request/access/:id", accessibilityController.giveAccess);

module.exports = router;
