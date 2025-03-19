const express = require("express");
const applicantController = require("../../controllers/applicantController");
const authMiddleware = require("../../middlewares/authMiddleware");
const applicantMiddleware = require("../../middlewares/applicantMiddleware");
const router = express.Router();

router.patch("/", authMiddleware, applicantMiddleware, applicantController.update);
router.get("/", authMiddleware, applicantMiddleware, applicantController.findOne);

module.exports = router;
