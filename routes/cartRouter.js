const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const {
  addToCart,
  deleteCartProduct,
} = require("../controller/cartController");
const { body } = require("express-validator");
const { validator } = require("../middleware/validateMiddleware");

const cartRouter = express.Router({ mergeParams: true });

cartRouter
  .route("/add-to-cart")
  .post(
    protectUser,
    body("buyingPrice")
      .exists({ checkFalsy: true })
      .withMessage("buying price not available"),
    body("returnType")
      .exists({ checkFalsy: true })
      .withMessage("Please select return type"),
    validator,
    addToCart
  );
cartRouter.route("/delete-cart-product").delete(protectUser, deleteCartProduct);

module.exports = cartRouter;
