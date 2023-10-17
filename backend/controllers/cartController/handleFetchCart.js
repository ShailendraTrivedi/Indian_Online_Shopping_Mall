const CartModel = require("../../models/CartModel");
const ProductModel = require("../../models/ProductModel");

/** GET :  http://localhost:5000/cart/allCartItem */

const handleFetchCart = async (req, res) => {
  try {
    const { userId } = req.details;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad Request: User ID not provided." });
    }

    const userCart = await CartModel.findOne({ userId: userId });
    if (!userCart) {
      return res
        .status(404)
        .json({ error: "Not Found: Cart not found for the user." });
    }

    const productsInCart = userCart.products.map((item) => ({
      productId: item.productId,
      productQuantity: item.productQuantity,
    }));

    const productIds = productsInCart.map((item) => item.productId);

    const products = await ProductModel.find(
      { _id: { $in: productIds } },
      { productImg: true, productName: true, productPrice: true }
    );

    // Add quantity to the products
    const productsWithQuantity = products.map((product) => {
      const itemInCart = productsInCart.find(
        (item) => item.productId.toString() === product._id.toString()
      );
      if (itemInCart) {
        return {
          ...product._doc,
          productQuantity: itemInCart.productQuantity,
        };
      }
      return product._doc;
    });

    return res.status(200).json(productsWithQuantity);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error: Unable to fetch cart data." });
  }
};

module.exports = handleFetchCart;
