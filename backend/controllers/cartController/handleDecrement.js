const CartModel = require("../../models/CartModel");

/** PATCH :  http://localhost:5000/cart/decrementCartItem */
const handleDecrementCartItem = async (req, res) => {
  try {
    const { productId, userId } = req.details;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "Bad Request: User ID and Product ID are required." });
    }

    const userCart = await CartModel.findOne({ userId: userId });

    if (!userCart) {
      return res
        .status(404)
        .json({ error: "Not Found: Cart not found for the user." });
    }

    const cartItem = userCart.products.find(
      (item) => item.productId === productId
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Not Found: Cart item not found." });
    }

    if (cartItem.productQuantity - 1 > 0) cartItem.productQuantity -= 1;

    await userCart.save();

    return res
      .status(200)
      .json({ message: "Item quantity decremented successfully", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Internal Server Error: An error occurred while updating the cart item.",
    });
  }
};

module.exports = handleDecrementCartItem;
