const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Coupon = require("../models/Coupon");
const authMiddleware = require("../middlewares/authMiddleware");
const {loginAdmin, logoutAdmin, createAdmin,getAllAdmins,getAdminActivityLog} = require("../controllers/adminController");

//Admin Login
router.post("/login",loginAdmin);
router.post("/logout",authMiddleware, logoutAdmin);
router.post("/create", createAdmin);
router.get("/admins",authMiddleware, getAllAdmins);
router.get("/activity-log",authMiddleware, getAdminActivityLog);

module.exports = router;