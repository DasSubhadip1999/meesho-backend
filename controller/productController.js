const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const Product = require("../models/productModel");
const fs = require("fs");

//Add prducts Method POST
//@access private
//route api/products/add

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

  let images;
  if (req.files) {
    images = req.files.map((image) => image.path);
  } else {
    res.status(400);
    throw new Error("Please select product image");
  }

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
  const queryParams = req.query;
  let products;
  if (Object.keys(queryParams).length !== 0) {
    if (Number(queryParams.s.split("")[0]) % 1 === 0) {
      products = await Product.findById(queryParams.s);
    } else {
      products = await Product.find({
        name: { $regex: queryParams.s, $options: "i" },
      });
    }
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
  const product = await Product.findById(req.params.id);

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
    throw new Error("Not authorized");
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
