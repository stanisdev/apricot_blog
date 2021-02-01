'use strict';

const httpStatus = require('http-status');

module.exports = (req, res, next) => {
  const status = 404;
  const message = 'Nothing was found';

  res
    .status(status)
    .json({
      error: httpStatus[status],
      message,
      status,
      timestamp: new Date(),
    });
};