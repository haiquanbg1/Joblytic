const express = require("express");

const auth = require("./apis/authApi");
const user = require("./apis/userApi");
const applicant = require("./apis/applicantApi");
const company = require("./apis/companyApi");
const experience = require("./apis/experienceApi");
const message = require("./apis/messageApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/applicant", applicant);
router.use("/company", company);
router.use("experience", experience);
router.use("/message", message);

module.exports = router;