const express = require("express");
const { protectUser } = require("../middleware/authMiddleware");
const {
  addReview,
  getReviews,
  getSingleReview,
  deleteReview,
} = require("../controller/reviewController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.route("/").post(protectUser, addReview).get(getReviews);
reviewRouter.route("/by-user").get(protectUser, getSingleReview);
reviewRouter.route("/:reviewId").delete(protectUser, deleteReview);

module.exports = reviewRouter;
