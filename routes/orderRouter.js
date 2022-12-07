const express = require("express");
const { placeOrder } = require("../controller/orderController");
const { protectUser } = require("../middleware/authMiddleware");

const orderRouter = express.Router();

orderRouter.route("/").post(protectUser, placeOrder);

module.exports = orderRouter;
