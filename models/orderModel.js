const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Product is required"],
          ref: "Product",
        },
        userOrder: {
          type: Object,
          required: true,
        },
      },
    ],
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Address",
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
