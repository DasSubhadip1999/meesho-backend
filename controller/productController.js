const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  const {
    manufacturer,
    importer,
    packer,
    contact,
    name,
    type,
    gender,
    isKids,
    color,
    price,
    size,
    discount,
  } = req.body;

  //form validation
  if (
    !manufacturer ||
    !packer ||
    !name ||
    !type ||
    !gender ||
    !color ||
    !price
  ) {
    res.status(400);
    throw new Error("* fields are required");
  }

  //get the seller from DB
  const seller = await Seller.findById(req.seller.id);
  if (!seller) {
    res.status(404);
    throw new Error("Seller details not fount");
  }

  const colors = color.split(",");

  //add product to DB
  const product = await Product.create({
    seller: req.seller.id,
    manufacturer,
    importer,
    packer,
    contact,
    name,
    type,
    gender,
    isKids,
    colors,
    price,
    size,
    discount,
  });

  if (!product) {
    res.status(400);
    throw new Error("Could not add the product try again");
  } else {
    res.status(201).json(product);
  }
});

//get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    res.status(500);
    throw new Error("Couldn't get the products");
  } else {
    res.status(200);
    res.json(products);
  }
});

module.exports = {
  addProduct,
  getProducts,
};
