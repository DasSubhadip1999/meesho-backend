const express = require("express");
const { validator } = require("../middleware/validateMiddleware");
const { body } = require("express-validator");
const {
  registerSeller,
  getSeller,
  loginSeller,
  getSellersProduct,
  getFeedbacks,
  addFeedback,
} = require("../controller/sellerController");
const { protectSeller } = require("../middleware/authMiddleware");
const { uploadVideo } = require("../middleware/uploadMiddleware");
const sellerRouter = express.Router();
//register
sellerRouter
  .route("/register")
  .post(
    body("name").exists({ checkFalsy: true }).withMessage("Name cant be empty"),
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    registerSeller
  )
  .get(getSeller);

//login
sellerRouter
  .route("/login")
  .post(
    body("email").isEmail().withMessage("Email must be an valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should have minimum length six"),
    validator,
    loginSeller
  );
sellerRouter.route("/get-products").get(protectSeller, getSellersProduct);
sellerRouter
  .route("/feedbacks")
  .get(getFeedbacks)
  .post(
    body("location")
      .exists({ checkFalsy: true })
      .withMessage("Location is required to add feedback"),
    body("feedback")
      .isLength({ min: 20 })
      .withMessage("Feedback should have minimum length 20"),
    protectSeller,
    uploadVideo.single("video"),
    addFeedback
  );

module.exports = sellerRouter;
