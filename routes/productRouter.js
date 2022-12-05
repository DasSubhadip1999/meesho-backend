const express = require("express");
const { addProduct, getProducts } = require("../controller/productController");
const { protectSeller } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const productRouter = express.Router();

productRouter
  .route("/add")
  .post(protectSeller, upload.array("images"), addProduct);
// productRouter.route('/delete/:id', require('../))
productRouter.route("/get").get(getProducts);

module.exports = productRouter;
