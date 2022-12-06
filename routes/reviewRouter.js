const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const {
  addReview,
  getReviews,
  getSingleReview,
} = require("../controller/reviewController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route("/").post(protectUser, addReview).get(getReviews);
reviewRouter.route("/by-user").get(protectUser, getSingleReview);

module.exports = reviewRouter;
