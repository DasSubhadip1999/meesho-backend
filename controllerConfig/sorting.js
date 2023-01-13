const Product = require("../models/productModel");

const sorting = async (sort) => {
  let products;
  switch (sort) {
    case "new-arrivals":
      products = await Product.find()
        .sort({ createdAt: "desc" })
        .populate("seller", "-password");
      return products;
      break;

    case "high-to-low":
      products = await Product.find()
        .sort({ discountedPrice: "desc" })
        .populate("seller", "-password");
      return products;
      break;

    case "low-to-high":
      products = await Product.find()
        .sort({ discountedPrice: "asc" })
        .populate("seller", "-password");
      return products;
      break;

    case "discount":
      products = await Product.find()
        .sort({ overAllDiscount: "desc" })
        .populate("seller", "-password");
      return products;
      break;

    case "man":
      products = await Product.find({ gender: "male" }).populate(
        "seller",
        "-password"
      );
      return products;
      break;

    case "woman":
      products = await Product.find({ gender: "female" }).populate(
        "seller",
        "-password"
      );
      return products;
      break;

    default:
      products = await Product.find().populate("seller", "-password");
      return products;
  }
};

module.exports = sorting;
