const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email, password);
  //form validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Fill all details in form");
  }

  //check if the user is already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This user already exists");
  }

  //hash the password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user in database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const { name, email, _id } = user;
    res.status(201);
    res.json({
      id: _id,
      name,
      email,
      token: genToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create account");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //form validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill out all details");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    const { name, email, _id } = userExists;
    res.status(200).json({
      id: _id,
      name,
      email,
      token: genToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong email id or password");
  }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc add delivery address
//@acess private
//route /api/users/delivery-address/add
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const {
    addressName,
    phoneNumber,
    houseNo,
    area,
    pincode,
    city,
    state,
    nearByLocation,
  } = req.body;

  const address = await Address.create({
    user: req.user.id,
    addressName,
    phoneNumber,
    houseNo,
    area,
    pincode,
    city,
    state,
    nearByLocation,
  });

  if (!address) {
    res.status(400);
    throw new Error("Couldn't create address");
  }

  res.status(200).json(address);
});

module.exports = {
  registerUser,
  loginUser,
  addAddress,
};
