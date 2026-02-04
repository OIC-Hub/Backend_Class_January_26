const contact = require("../Model/data");
const Product = require("../Model/product");

function AddData(req, res) {
  const { name, phoneNo } = req.body;

  const newData = {
    id: contact.length + 1,
    name: name,
    phoneNo: phoneNo,
  };

  contact.push(newData);
  res.status(200).json({ message: "Contact Added", contact });
}

function getData(req, res) {
  try {
    res.status(200).json({ message: "All contacts", contact });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

function AddProduct(req, res) {
  try {
    const { productName, productImage, productPrice } = req.body;

    const newProduct = new Product({
      productName,
      productImage,
      productPrice,
    });

    newProduct.save();
    res.status(200).json({ message: "product added successfully" });
  } catch (error) {
    console.error(error);
  }
}

const getProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json({ message: "Products", allProduct });
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { productName, productImage, productPrice } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, { productName, productImage, productPrice }, { new: true } );
    
    res.status(200).json({ message: "updated", updatedProduct });
  } catch (error) {
    console.error(error)
  }
};
module.exports = { AddData, getData, AddProduct, getProduct, updateProduct};
