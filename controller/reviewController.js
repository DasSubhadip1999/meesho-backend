const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Review = require("../models/reviewsModel");
const Product = require("../models/productModel");

const addReview = asyncHandler(async (req, res) => {
  //res.status(200).json({ message: "ok" });
  const { rating, review } = req.body;

  //form validation
  if (!rating || !review) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //get the current user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //find the current product
  const currentProduct = await Product.findById(req.params.id);

  if (!currentProduct) {
    res.status(400);
    throw new Error("Product not found");
  }

  const reviews = await Review.create({
    user: req.user.id,
    product: req.params.id,
    rating,
    review,
  });

  if (!reviews) {
    res.status(400);
    throw new Error("Could not add reviews");
  }
  res.status(201).json(reviews);
});

//Get all reviews for product Medhod GET
//@route api/products/get/:id/reviews
//@access public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id }).populate(
    "user"
  );

  if (!reviews) {
    res.status(400);
    throw new Error("Review not found");
  }

  res.status(200).json(reviews);
});

//get all reviews that current user posted
//@route api/products/get/:id/reviews/by-user

const getSingleReview = asyncHandler(async (req, res) => {
  //get the user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //get the review
  const review = await Review.find({ user: req.user.id }).populate([
    "user",
    "product",
  ]);

  if (!review) {
    res.status(400);
    throw new Error("Review not found");
  }
  res.status(200).json(review);
});

//delete a single review
//@router api/products/get/:id/reviews/by-user
const deleteReview = asyncHandler(async (req, res) => {
  //get the user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //get the review
  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    res.status(200);
    throw new Error("Review not found");
  }

  await review.remove();

  res.status(200).json({ message: "Review deleted successfully" });
});

module.exports = {
  addReview,
  getReviews,
  getSingleReview,
  deleteReview,
};
