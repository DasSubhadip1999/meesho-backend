const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Seller name is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
