const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");
const {registerUser, loginUser, getUser, getProfile, verifyOTP} = require("../controller/auth")

router.post("/register", registerUser) 
router.post("/login", loginUser)
router.get("/getuser", authenticateToken, roleMiddleware("admin"), getUser)
router.get("/profile", authenticateToken, getProfile)
router.post("/otp", verifyOTP)


module.exports = router;