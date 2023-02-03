const express = require("express");
const {
  registerUser,
  loginUser,
  confirmUserEmail,
  addAddress,
  getAddress,
} = require("../controller/userController");
const { body } = require("express-validator");
const { validator } = require("../middleware/validateMiddleware");
const { protectUser } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(
    body("name").exists({ checkFalsy: true }).withMessage("Name cant be empty"),
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    registerUser
  );
userRouter
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    loginUser
  );

userRouter
  .route("/delivery-address/add")
  .post(
    body("addressName")
      .exists({ checkFalsy: true })
      .withMessage("Name can't be empty"),
    body("phoneNumber")
      .isLength({ min: 10 })
      .withMessage("Enter a valid mobile number"),
    body("houseNo")
      .exists({ checkFalsy: true })
      .withMessage("House no. /building name required"),
    body("area").exists({ checkFalsy: true }).withMessage("Area is required"),
    body("pincode")
      .exists({ checkFalsy: true })
      .withMessage("Pin Code required"),
    body("city").exists({ checkFalsy: true }).withMessage("City is required"),
    body("state").exists({ checkFalsy: true }).withMessage("State is required"),
    validator,
    protectUser,
    addAddress
  );

userRouter.route("/delivery-address/get").get(protectUser, getAddress);
userRouter.route("/confirm-email/:token").get(confirmUserEmail);

module.exports = userRouter;
