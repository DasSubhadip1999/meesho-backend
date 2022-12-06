const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const {
  addToCart,
  deleteCartProduct,
} = require("../controller/cartController");

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/add-to-cart").post(protectUser, addToCart);
cartRouter.route("/delete-cart-product").delete(protectUser, deleteCartProduct);

module.exports = cartRouter;
