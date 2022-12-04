const express = require("express");
const { addProduct, getProducts } = require("../controller/productController");
const { protectSeller } = require("../middleware/authMiddleware");

const productRouter = express.Router();

productRouter.route("/add").post(protectSeller, addProduct);
productRouter.route("/get").get(getProducts);

module.exports = productRouter;
