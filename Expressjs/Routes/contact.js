const express = require("express")
const {AddData, getData, AddProduct} = require("../Controller/contact")
const router = express.Router();

router.post("/add", AddData);
router.get("/get", getData);
router.post("/product", AddProduct)

module.exports = router;

