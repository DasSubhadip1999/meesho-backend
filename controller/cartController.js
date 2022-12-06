const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

//@desc add a product to cart collection with current user
//@router api/products/get/:id/add-to-cart
//@access private
const addToCart = asyncHandler(async (req, res) => {
  //check the product
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cartItem = await Cart.create({
    user: req.user.id,
    product: req.params.id,
  });

  if (!cartItem) {
    res.status(400);
    throw new Error("Could not add product to cart");
  }

  res.status(200).json(cartItem);
});

//@desc get added products to cart
//@route api/products/get/cart-products
//@access private
const getCartProducts = asyncHandler(async (req, res) => {
  //get the user
  const user = User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const products = await Cart.find({ user: req.user.id }).populate("product");

  if (!products) {
    res.status(400);
    throw new Error("Cart Product not found");
  }

  res.status(200).json(products);
});

module.exports = {
  addToCart,
  getCartProducts,
};
