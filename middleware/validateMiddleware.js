const { validationResult } = require("express-validator");
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    let msg = errors.array().map(({ msg }) => msg);

    throw new Error(JSON.stringify(msg));
  }
  next();
};

module.exports = {
  validator,
};
