const { Router } = require("express");
const {
  handleAllProducts,
} = require("../controllers/productController/handleAllProducts");

const ProductRouter = Router();

ProductRouter.post("/allProducts", handleAllProducts);

module.exports = ProductRouter;
