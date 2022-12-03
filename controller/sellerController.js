const asyncHandler = require("express-async-handler");

const registerSeller = asyncHandler(async (req, res) => {
  res.status(400).json({ message: "Welcome" });
});

module.exports = {
  registerSeller,
};
