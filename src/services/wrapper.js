'use strict';

const app = require(global.config.services.app);
const Errorify = require(global.config.services.errorify);
const db = app.get('db');

const wrapper = (fn) => {
  return (req, res, next) => {
    const params = {
      db,
      req,
      res,
      Errorify
    };
    fn(params)
      .then(next)
      .catch(next);
  };
};

module.exports = wrapper;