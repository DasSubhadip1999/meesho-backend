const express = require("express");
const { validator } = require("../middleware/validateMiddleware");
const { body } = require("express-validator");
const {
  registerSeller,
  getSeller,
  loginSeller,
  getSellersProduct,
} = require("../controller/sellerController");
const { protectSeller } = require("../middleware/authMiddleware");
const sellerRouter = express.Router();
//register
sellerRouter
  .route("/register")
  .post(
    body("name").exists({ checkFalsy: true }).withMessage("Name cant be empty"),
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    registerSeller
  )
  .get(getSeller);

//login
sellerRouter
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    loginSeller
  );
sellerRouter.route("/get-products").get(protectSeller, getSellersProduct);

module.exports = sellerRouter;
