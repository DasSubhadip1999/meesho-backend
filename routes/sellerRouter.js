const express = require("express");
const { registerSeller } = require("../controller/sellerController");

const sellerRouter = express.Router();

sellerRouter.post("/register", registerSeller);

module.exports = sellerRouter;
