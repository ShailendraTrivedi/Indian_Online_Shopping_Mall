const ProductModel = require("../../models/ProductModel");

/** POST : http://localhost:5000/product/allProducts */
const handleAllProducts = async (req, res) => {
  const { category } = req.body;
  try {
    let products = await ProductModel.find({ productCategory: category });
    if (products && products.length > 0) {
      res.status(200).send(products);
    } else {
      res.status(404).send({ result: "No Products Found!!" });
    }
  } catch (error) {
    res.status(500).send({ result: "Error fetching products" });
  }
};

module.exports = {
  handleAllProducts,
};
