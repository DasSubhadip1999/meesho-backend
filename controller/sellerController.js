const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Seller = require("../models/sellerModel");

const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //form validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  //check if seller exist
  const sellerExists = await Seller.findOne({ email });
  if (sellerExists) {
    res.status(400);
    throw new Error("Seller already exists");
  }

  //verify the email is original
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.mail.mail.com",
  //   port: 465,
  //   service: "mail",
  //   secure: true, // true for 465, false for other ports
  //   auth: {
  //     user: "meesho.query@mail.com", // generated ethereal user
  //     pass: "Subha@123@meesho", // generated ethereal password
  //   },
  //   logger: true,
  // });

  // const mail = {
  //   from: "meesho.query@mail.com",
  //   to: email,
  //   subject: "Testing mail",
  //   text: "Main text body",
  // };

  // const response = await transporter.sendMail(mail);

  // if (!response) {
  //   res.status(400);
  //   throw new Error("Could not send mail");
  // } else {
  //   console.log(response);
  // }

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a seller in DB
  const seller = await Seller.create({
    name,
    email,
    password: hashedPassword,
  });

  if (seller) {
    const { _id, name, email } = seller;
    res.status(201);
    res.json({
      id: _id,
      name,
      email,
      token: genToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("Falied to create account");
  }
});

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Login seller
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //form validation
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields required");
  }

  //find the seller in DB
  const seller = await Seller.findOne({ email });

  if (seller && (await bcrypt.compare(password, seller.password))) {
    const { _id, name, email } = seller;
    res.status(200);
    res.json({
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

const getSeller = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "work" });
});

module.exports = {
  registerSeller,
  loginSeller,
  getSeller,
};
