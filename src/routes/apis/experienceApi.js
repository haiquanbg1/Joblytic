const express = require("express");
const experienceController = require("../../controllers/experienceController");
const authMiddleware = require("../../middlewares/authMiddleware");
const applicantMiddleware = require("../../middlewares/applicantMiddleware");
const router = express.Router();

router.patch("/", authMiddleware, applicantMiddleware, experienceController.update);
router.post("/", authMiddleware, applicantMiddleware, experienceController.create);

module.exports = router;
