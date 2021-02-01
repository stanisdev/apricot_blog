'use strict';

const Errorify = require(global.config.services.errorify);
const httpStatus = require('http-status');

module.exports = (error, req, res, next) => {
  let status = 500;
  let message = req.t('app.server-error');
  // @todo: Add logging

  if (error instanceof Errorify) {
    status = error.status;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  const result = {
    error: httpStatus[status],
    message,
    status,
    timestamp: new Date()
  };
  res.status(status).json(result);
};