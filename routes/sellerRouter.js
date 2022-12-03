const express = require("express");
const {
  registerSeller,
  getSeller,
  loginSeller,
} = require("../controller/sellerController");

const sellerRouter = express.Router();

sellerRouter.route("/register").post(registerSeller).get(getSeller);
sellerRouter.route("/login").post(loginSeller);

module.exports = sellerRouter;
