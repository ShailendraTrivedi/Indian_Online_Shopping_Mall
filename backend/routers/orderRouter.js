const { Router } = require("express");
const checkAuth = require("../middlewares/checkAuth");
const handleAddOrder = require("../controllers/orderController/handleAddOrder");
const handleFetchOrder = require("../controllers/orderController/handleFetchOrder");

const OrderRouter = Router();

OrderRouter.post("/addOrder", checkAuth, handleAddOrder);
OrderRouter.get("/fetchOrder", checkAuth, handleFetchOrder);

module.exports = OrderRouter;
