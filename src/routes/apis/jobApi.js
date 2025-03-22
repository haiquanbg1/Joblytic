const express = require("express");
const jobController = require("../../controllers/jobController");
const authMiddleware = require("../../middlewares/authMiddleware");
const companyMiddleware = require("../../middlewares/companyMiddleware");
const router = express.Router();

router.get("/", authMiddleware, companyMiddleware, jobController.findAll);
router.get("/:job_id", authMiddleware, companyMiddleware, jobController.findOne);
router.patch("/:job_id", authMiddleware, companyMiddleware, jobController.update);
router.post("/", authMiddleware, companyMiddleware, jobController.create);
router.delete("/", authMiddleware, companyMiddleware, jobController.destroy);

module.exports = router;
