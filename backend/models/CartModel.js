const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Product ID is required in cartSchema"],
    },
    productQuantity: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required in cartSchema"],
  },
  products: [productSchema],
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
