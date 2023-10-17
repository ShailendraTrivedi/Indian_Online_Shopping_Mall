const OrderModel = require("../../models/OrderModel");
const ProductModel = require("../../models/ProductModel");

/** GET :  http://localhost:5000/fetchOrder */
const handleFetchOrder = async (req, res) => {
  const { userId } = req.details;

  try {
    const userOrder = await OrderModel.findOne({ userId: userId });

    if (!userOrder) {
      return res.status(404).json({ error: "Order not found for the user." });
    }

    const productsInOrder = userOrder.products;

    const productIds = productsInOrder.map((item) => item.productId);
    const productDetails = await ProductModel.find(
      {
        _id: { $in: productIds },
      },
      { productName: true, productImg: true, productPrice: true }
    );

    // Add quantity to the products
    const productsWithQuantity = productDetails.map((product) => {
      const itemInOrder = productsInOrder.find(
        (item) => item.productId.toString() === product._id.toString()
      );
      if (itemInOrder) {
        return {
          ...product.toObject(),
          productStatus: itemInOrder.productStatus,
          productQuantity: itemInOrder.productQuantity,
        };
      }
      return product.toObject();
    });

    return res.status(200).json(productsWithQuantity);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server Error: Unable to fetch the order." });
  }
};

module.exports = handleFetchOrder;
