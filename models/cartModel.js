const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Product id is required"],
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
