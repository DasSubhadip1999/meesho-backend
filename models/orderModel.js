const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    cart: {
      type: [],
      required: [true, "Cart is empty"],
    },
    deliveryDate: {
      type: String,
      required: [true, "Delivery date not added"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);