const express = require("express");
const {
  registerSeller,
  getSeller,
  loginSeller,
  getSellersProduct,
} = require("../controller/sellerController");
const { protectSeller } = require("../middleware/authMiddleware");
const sellerRouter = express.Router();

sellerRouter.route("/register").post(registerSeller).get(getSeller);
sellerRouter.route("/login").post(loginSeller);
sellerRouter.route("/get-products").get(protectSeller, getSellersProduct);

module.exports = sellerRouter;
