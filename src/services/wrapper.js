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
        body: req.body,
        User: db.User,
        Errorify
      })
        .then(data => {
          const result = {
            success: true
          };
          if (data instanceof Object) {
            result.data = data;
          }
          res.json(result);
        })
        .catch(next);
    };
  }
};