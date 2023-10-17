const CartModel = require("../../models/CartModel");

/** POST :  http://localhost:5000/cart/addToCart */
const handleAddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.details;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "Bad Request: User ID or Product ID not provided." });
    }

    let userCart = await CartModel.findOne({ userId });

    if (!userCart) {
      userCart = new CartModel({
        userId,
        products: [],
      });
    }

    const productExists = userCart.products.some(
      (item) => item.productId === productId
    );

    if (productExists) {
      return res
        .status(409)
        .json({ error: "Conflict: Product Already Present." });
    }

    userCart.products.push({ productId });

    const result = await userCart.save();

    if (result) {
      return res
        .status(201)
        .json({ message: "Created: Item added to the cart successfully." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error: Item not added to the cart." });
  }
};

module.exports = handleAddToCart;
