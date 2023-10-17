const CartModel = require("../../models/CartModel");
const OrderModel = require("../../models/OrderModel");

/** POST :  http://localhost:5000/order/addOrder */
const handleAddOrder = async (req, res) => {
  try {
    const { userId } = req.details;

    const userCart = await CartModel.findOne({ userId: userId });
    let userOrder = await OrderModel.findOne({ userId: userId });

    if (!userOrder) {
      const newOrder = new OrderModel({
        userId: userId,
        products: [],
        status: "pending",
      });
      await newOrder.save();
    }

    userOrder = await OrderModel.findOne({ userId: userId });

    const cartProducts = userCart.products.map((cartItem) => ({
      productId: cartItem.productId,
      productQuantity: cartItem.productQuantity,
    }));

    userOrder.products = userOrder.products.concat(cartProducts);

    userCart.products = [];

    const result = await Promise.all([userOrder.save(), userCart.save()]);

    return res.status(200).json("message: Order Placed.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error: Unable to add the order.");
  }
};

module.exports = handleAddOrder;
