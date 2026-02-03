const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productImage: {
        type: String,
        require: true
    },
    productPrice: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Product', productSchema);
