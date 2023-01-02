const express = require("express");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controller/productController");
const { protectSeller, protectUser } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const reviewRouter = require("./reviewRouter");
const cartRouter = require("./cartRouter");
const {
  getCartProducts,
  deleteAllCartProducts,
} = require("../controller/cartController");

const productRouter = express.Router();

//re routing for review router
productRouter.use("/get/:id/reviews", reviewRouter);

//re-routing for cart router
productRouter.use("/get/:id", cartRouter);

productRouter
  .route("/add")
  .post(protectSeller, upload.array("images"), addProduct);
productRouter.route("/delete/:id").delete(protectSeller, deleteProduct);
productRouter.route("/get").get(getProducts);
productRouter.route("/get/:id").get(getSingleProduct);
productRouter.route("/cart-products").get(protectUser, getCartProducts);
productRouter
  .route("/cart-products/delete-all")
  .delete(protectUser, deleteAllCartProducts);

module.exports = productRouter;
