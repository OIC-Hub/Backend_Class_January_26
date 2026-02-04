const express = require("express")
const {AddData, getData, AddProduct, getProduct, updateProduct} = require("../Controller/contact")
const router = express.Router();

router.post("/add", AddData);
router.get("/get", getData);
router.post("/product", AddProduct)
router.get("/products", getProduct)
router.put("/product/:id", updateProduct)

module.exports = router;

