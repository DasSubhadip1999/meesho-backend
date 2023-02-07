const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../asset/sendMail");
const emailTemplate = require("../asset/emailTemplate");

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
    const { name, email, _id, isVerified } = user;

    let token = genToken(_id);

    let subject = "Email Verification";

    let text = "Please verify your email";

    let link = `${process.env.BASE_URL}/api/users/confirm-email/${token}`;

    let html = emailTemplate(link);

    let emailResponse = sendMail(email, subject, text, html);

    if (!emailResponse) {
      res.status(500);
      throw new Error("Something went wrong with sending verification email");
    }

    res.status(201);
    res.json({
      id: _id,
      name,
      email,
      isVerified,
      message:
        "Verification email send to your email id and will expire in 5 minutes",
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
    const { name, email, _id, isVerified } = userExists;

    if (isVerified) {
      res.status(200).json({
        id: _id,
        name,
        email,
        token: genToken(_id),
        isVerified,
      });
    } else {
      res.status(400);
      throw new Error("Please verify you email id");
    }
  } else {
    res.status(400);
    throw new Error("Wrong email id or password");
  }
});

const confirmUserEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400);
    throw new Error("Token is not present");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);

    if (user.isVerified) {
      res.status(200);
      res.render("emailVerification.ejs", {
        text: "Your email id is already verified",
      });
      return;
    }

    if (!user) {
      res.status(400);
      throw new Error("Please check you token");
    }

    let data = await User.findByIdAndUpdate(user._id, {
      $set: { isVerified: true },
    });

    if (!data) {
      res.status(500);
      throw new Error("Something went wrong in verification");
    }

    res.status(200);
    res.render("emailVerification.ejs", {
      text: "Your email id is verified successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
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

  res.status(201).json(address);
});

const getAddress = asyncHandler(async (req, res) => {
  const user = User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const addresses = await Address.find({ user: req.user.id });

  if (!addresses) {
    res.status(400);
    throw new Error("No Address found");
  }

  //console.log(addresses);

  res.status(200).json(addresses);
});

module.exports = {
  registerUser,
  loginUser,
  confirmUserEmail,
  addAddress,
  getAddress,
};
