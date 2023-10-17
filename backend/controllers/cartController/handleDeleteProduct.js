const CartModel = require("../../models/CartModel");

/** DEL :  http://localhost:5000/cart/deleteProduct */

const handleDeleteProduct = async (req, res) => {
  try {
    const { productId, userId } = req.details;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "Bad Request: User ID and Product ID are required." });
    }

    const userCart = await CartModel.findOne({ userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ error: "Not Found: Cart not found for the user." });
    }

    userCart.products = userCart.products.filter(
      (item) => item.productId !== productId
    );

    await userCart.save();

    return res
      .status(200)
      .json({ message: "Product deleted from the cart successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error:
        "Internal Server Error: An error occurred while deleting the product.",
    });
  }
};

module.exports = handleDeleteProduct;
