const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Seller id is missing"],
      ref: "Seller",
    },
    manufactuer: {
      type: String,
      required: [true, "Manufacturer is required"],
    },
    importer: {
      type: String,
    },
    packer: {
      type: String,
      required: [true, "packer is required"],
    },
    contact: {
      type: String,
      default: "query@meesho.com",
    },
    name: {
      type: String,
      required: [true, "Name of the product is required"],
    },
    type: {
      type: String,
      required: [true, "Type of the product is required e.g. Shirt, Trouser"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    isKids: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      required: [true, "Color is reaquired"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    size: {
      type: [],
    },
    ratings: {
      type: [],
    },
    discount: {
      type: Boolean,
      default: false,
    },
    legalDescription: {
      type: String,
      default:
        "Suppliers listing their products on Meesho are solely responsible for the accuracy of product information. You shall use the products in safe and legal manner, and it shall not be used for any illegal purpose. The actual product packaging, material and design may contain more or different information as mentioned here including nutritional information, declarations, claims, instructions of use, warning, disclaimers et. al. It is recommended you read the product label before using/consuming any products and do not solely rely on the product information provided on this platform. Meesho shall not assume any loss, claims, damages, or injury, that may arise from the violent or illegal use, or misuse of the product sold by the suppliers over Meesho.",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
