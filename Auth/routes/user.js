const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const {registerUser, loginUser, getUser, getProfile, verifyOTP} = require("../controller/auth")

router.post("/register", registerUser) 
router.post("/login", loginUser)
router.get("/users", getUser)
router.get("/profile", authenticateToken, getProfile)
router.post("/otp", verifyOTP)
// router.get("/", homepage)

module.exports = router;