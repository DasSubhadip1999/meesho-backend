const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const fs = require("fs");

//Add prducts Method POST
//@access private
//route api/products/add

const addProduct = asyncHandler(async (req, res) => {
  //console.log("req.body", req.body);
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
    discountedPrice,
  } = req.body;
  console.log("discountedPrice", discountedPrice);
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

  let images;
  //console.log("req.files", req.files);
  if (req.files) {
    //console.log("controller", req.files);
    images = req.files.map((image) => image.path);
  } else {
    res.status(400);
    throw new Error("Please select product image");
  }

  //console.log("images", images);
  //console.log("req.body", req.body);
  //get the seller from DB
  const seller = await Seller.findById(req.seller.id);
  if (!seller) {
    res.status(404);
    throw new Error("Seller details not fount");
  }

  const colors = color.split(",");
  const sizes = size ? size.split(",") : [];

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
    images,
    price,
    sizes,
    discount,
    discountedPrice,
  });

  if (!product) {
    res.status(400);
    throw new Error("Could not add the product try again");
  } else {
    res.status(201).json(product);
  }
});

//Get prducts Method GET
//@access public
//route api/products/get
const getProducts = asyncHandler(async (req, res) => {
  const { search, limit } = req.query;
  let products;
  if (search) {
    if (Number(search.split("")[0]) % 1 === 0) {
      products = await Product.findById(search);
    } else {
      products = await Product.find({
        name: { $regex: search, $options: "i" },
      }).limit(limit);
    }
  } else if (limit) {
    products = await Product.find().limit(limit);
  } else {
    products = await Product.find();
  }

  if (!products) {
    res.status(500);
    throw new Error("Couldn't get the products");
  } else {
    res.status(200);
    res.json(products);
  }
});

//get single product Methode GET
//@access public
//@route api/products/get/:id
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("seller");

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  } else {
    res.status(200);
    res.json(product);
  }
});

//delete single prduct Method DELETE
//@access private
//@route api/products/delete/:id
const deleteProduct = asyncHandler(async (req, res) => {
  //find the seller who has make request
  const seller = await Seller.findById(req.seller.id);

  if (!seller) {
    res.status(400);
    throw new Error("Seller not found");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  if (product.seller.toString() !== req.seller.id) {
    res.status(401);
    throw new Error("Not authorized to delete");
  }

  product.images.forEach((image) => {
    fs.unlink(image, function (err) {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Successfully deleted the file.");
      }
    });
  });

  await product.remove();
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
