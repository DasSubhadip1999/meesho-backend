const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
} = require("../controller/productController");
const { protectSeller } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const productRouter = express.Router();

productRouter
  .route("/add")
  .post(protectSeller, upload.array("images"), addProduct);
productRouter.route("/delete/:id").delete(protectSeller, deleteProduct);
productRouter.route("/get").get(getProducts);

module.exports = productRouter;
