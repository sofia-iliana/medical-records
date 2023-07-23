const router = require("express").Router();
const medicalEntryController = require("../controllers/medicalEntryController");

router.post("/entry/create", medicalEntryController.createMedicalEntry);
router.get("/entry/user/:userId", medicalEntryController.getMedicalEntries);
router.delete("/entry/delete/:id", medicalEntryController.deleteEntry);
router.put("/entry/update/:id", medicalEntryController.editEntry);

module.exports = router;
