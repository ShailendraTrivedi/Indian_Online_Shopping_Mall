const { Router } = require("express");

const handleAddToCart = require("../controllers/cartController/handleAddToCart");
const checkAuth = require("../middlewares/checkAuth");
const handleFetchCart = require("../controllers/cartController/handleFetchCart");
const handleDeleteProduct = require("../controllers/cartController/handleDeleteProduct");
const handleIncreamentCartItem = require("../controllers/cartController/handleIncrement");
const handleDecrementCartItem = require("../controllers/cartController/handleDecrement");

const CartRouter = Router();

CartRouter.route("/allCartItem").get(checkAuth, handleFetchCart);
CartRouter.route("/addToCart").post(checkAuth, handleAddToCart);
CartRouter.route("/deleteProduct").delete(checkAuth, handleDeleteProduct);
CartRouter.route("/incrementCartItem").patch(
  checkAuth,
  handleIncreamentCartItem
);
CartRouter.route("/decrementCartItem").patch(
  checkAuth,
  handleDecrementCartItem
);

module.exports = CartRouter;
