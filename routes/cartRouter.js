const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const { addToCart, getCartProducts } = require("../controller/cartController");

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/add-to-cart").post(protectUser, addToCart);
//cartRouter.route("/get-cart-products").get(protectUser, getCartProducts);

module.exports = cartRouter;
