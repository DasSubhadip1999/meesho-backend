const { validationResult } = require("express-validator");
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(JSON.stringify(errors.array()));
  }
  next();
};

module.exports = {
  validator,
};
