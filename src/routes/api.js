const express = require("express");

const auth = require("./apis/authApi");
const user = require("./apis/userApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;