const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {registerUser, loginUser, getUser, getProfile} = require("../controller/auth")

router.post("/register", registerUser) 
router.post("/login", loginUser)
router.get("/getuser", getUser)
router.get("/profile", authenticateToken, getProfile)

module.exports = router;