const express = require("express");
const messageController = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");
const applicantMiddleware = require("../../middlewares/applicantMiddleware");
const companyMiddleware = require("../../middlewares/companyMiddleware");
const router = express.Router();



module.exports = router;
