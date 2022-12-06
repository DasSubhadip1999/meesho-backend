const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const { addToCart } = require("../controller/cartController");

const cartRouter = express.Router({ mergeParams: true });

cartRouter.route("/add-to-cart").post(protectUser, addToCart);

module.exports = cartRouter;
