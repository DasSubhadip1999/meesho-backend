const express = require("express");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controller/productController");
const { protectSeller } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const reviewRouter = require("./reviewRouter");

const productRouter = express.Router();

//re routing for review router
productRouter.use("/get/:id/reviews", reviewRouter);

productRouter
  .route("/add")
  .post(protectSeller, upload.array("images"), addProduct);
productRouter.route("/delete/:id").delete(protectSeller, deleteProduct);
productRouter.route("/get").get(getProducts);
productRouter.route("/get/:id").get(getSingleProduct);

module.exports = productRouter;
