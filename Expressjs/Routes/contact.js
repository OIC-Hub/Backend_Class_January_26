const express = require("express")
const {AddData, getData} = require("../Controller/contact")
const router = express.Router();

router.post("/add", AddData);
router.get("/get", getData);

module.exports = router;

