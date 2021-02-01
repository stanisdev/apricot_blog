'use strict';

const httpStatus = require('http-status');

module.exports = ({ t }, res) => {
  const status = 404;

  res
    .status(status)
    .json({
      error: httpStatus[status],
      message: t('app.404'),
      status,
      timestamp: new Date(),
    });
};