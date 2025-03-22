const express = require("express");
const companyController = require("../../controllers/companyController");
const authMiddleware = require("../../middlewares/authMiddleware");
const companyMiddleware = require("../../middlewares/companyMiddleware");
const router = express.Router();

router.get("/", authMiddleware, companyMiddleware, companyController.findAll);
router.get("/one", authMiddleware, companyMiddleware, companyController.findOne);
router.patch("/", authMiddleware, companyMiddleware, companyController.update);

module.exports = router;
