const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Add product working" });
});

module.exports = {
  addProduct,
};
