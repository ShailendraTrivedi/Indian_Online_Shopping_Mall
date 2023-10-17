const mongoose = require("mongoose");

const productDataSchema = new mongoose.Schema(
  {
    productData: {
      type: String,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  productImg: {
    type: String,
    required: [true, "Product image is required in productSchema"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required in productSchema"],
  },
  productList: [productDataSchema],
  productPrice: {
    type: String,
    required: [true, "Product price is required in productSchema"],
  },
  productCategory: {
    type: String,
    required: [true, "Product category is required in productSchema"],
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
