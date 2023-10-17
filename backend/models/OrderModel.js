const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, "Product ID is required for each product"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Quantity is required for each product"],
    min: [1, "Quantity must be at least 1"],
  },
  productStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required for the order"],
  },
  products: [productSchema],
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
