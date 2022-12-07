const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const { body } = require("express-validator");
const { validator } = require("../middleware/validateMiddleware");

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

module.exports = userRouter;
