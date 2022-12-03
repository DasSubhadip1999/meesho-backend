const express = require("express");
const { addProduct } = require("../controller/productController");

const productRouter = express.Router();

productRouter.route("/add").post(addProduct);

module.exports = productRouter;
