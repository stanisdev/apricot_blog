'use strict';

const app = require(global.config.services.app);
const Errorify = require(global.config.services.errorify);
const db = app.get('db');

module.exports = {
  middleware(fn) {
    return (req, res, next) => {
      fn({
        db,
        req,
        res,
        Errorify
      })
        .then(next)
        .catch(next);
    };
  },
  routeHandler(fn) {
    return (req, res, next) => {
      fn({
        db,
        req,
        res,
        Errorify
      })
        .then(data => res.json(data))
        .catch(next);
    };
  }
};