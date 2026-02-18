const expresss = require("express");
const router = expresss.Router();
const { loginpage, registerpage, dashboard, otpPage } = require("../controller/auth");

router.get("/login", loginpage);
router.get("/register", registerpage);
// router.get("/dashboard", dashboard);
router.get("/verifyotp", otpPage);
module.exports = router;