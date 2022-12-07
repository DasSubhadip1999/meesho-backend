const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

//@desc place order which product are in cart
//@route api/orders/my-orders
//@access private
const placeOrder = asyncHandler(async (req, res) => {
  //get the user
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  //get the cart items
  const cartItems = await cartModel.find({ user: req.user.id });

  if (!cartItems) {
    res.status(400);
    throw new Error("Could not place order cart is empty");
  }

  //set the delivery date
  let today = new Date();
  let day = today.getDate() + 6;
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let deliveryDate = new Date(`${month}-${day}-${year}`);

  const orderItems = await orderModel.create({
    user: req.user.id,
    cart: cartItems,
    deliveryDate,
  });

  if (!orderItems) {
    res.status(400);
    throw new Error("Could not place order");
  }

  res
    .status(200)
    .json({ message: "Order placed successfully", order: orderItems });
});

//@desc get the order items of current user
//@route api/orders/my-orders
//@access private

const getOrders = asyncHandler(async (req, res) => {
  //get the user
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //get the orders or current user

  const orders = await orderModel.find({ user: req.user.id });

  if (!orders) {
    res.status(404);
    throw new Error("Orders not found");
  }

  res.status(200).json(orders);
});

module.exports = {
  placeOrder,
  getOrders,
};
