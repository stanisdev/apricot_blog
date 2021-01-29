'use strict';

const Errorify = require(global.config.services.errorify);
const httpStatus = require('http-status');

module.exports = (error, req, res, next) => {
  let status = 500;
  let message = 'The server has caught an undefined error';
  console.log(error);

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