const express = require("express");
const { placeOrder, getOrders } = require("../controller/orderController");
const { protectUser } = require("../middleware/authMiddleware");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(protectUser, placeOrder)
  .get(protectUser, getOrders);

module.exports = orderRouter;
