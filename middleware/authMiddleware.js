const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");
const User = require("../models/userModel");

const protectSeller = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  //get the token from bearer token of request header
  if (header && header.startsWith("Bearer")) {
    try {
      token = header.split(" ")[1];

      //decode the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //set the user to the request object
      req.seller = await Seller.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    try {
      token = header.split(" ")[1];

      //decode the token and get id
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //set the id to req object
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    if (!token) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});

module.exports = { protectSeller, protectUser };
