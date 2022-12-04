const express = require("express");
const { addProduct } = require("../controller/productController");
const { protectSeller } = require("../middleware/authMiddleware");

const productRouter = express.Router();

productRouter.route("/add").post(protectSeller, addProduct);

module.exports = productRouter;
