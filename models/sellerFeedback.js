const mongoose = require("mongoose");

const sellerFeedbackSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Seller",
  },
  video: {
    type: String,
    required: [true, "video link is missing"],
  },
  location: {
    type: String,
    required: [true, "Location is missing"],
  },
  feedback: {
    type: String,
    required: [true, "feedback is required"],
  },
});

module.exports = mongoose.model("sellerfeedback", sellerFeedbackSchema);
