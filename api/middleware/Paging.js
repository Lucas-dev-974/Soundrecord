const { validator } = require("../utils");

const checkPagingParams = (req, res, next) => {
  const pagingValidator = validator(req.query, {
    page: "int",
    size: "int",
  });

  if (!pagingValidator.page) pagingValidator.page = 0;
  if (!pagingValidator.size) pagingValidator.size = 18;

  req.page = pagingValidator.page;
  req.size = pagingValidator.size;

  next();
};

exports.checkPagingParams = checkPagingParams;
