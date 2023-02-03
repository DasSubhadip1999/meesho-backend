const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: () => new Date(+new Date() + 5 * 60 * 1000), //will expire in 5 minutes
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { verificationExpires: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { isVerified: false },
  }
);

module.exports = mongoose.model("User", userSchema);
