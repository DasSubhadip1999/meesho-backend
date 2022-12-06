const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is missing"],
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Product id is missing"],
      ref: "Product",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "rating is require to upload review"],
    },
    review: {
      type: String,
      required: [true, "Please add review text"],
    },
  },
  {
    timestamps: true,
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
