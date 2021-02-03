'use strict';

const Errorify = require(global.config.services.errorify);

class AsyncWrapper {
  constructor(app) {
    this.app = app;
  }

  middleware(fn) {
    return (req, res, next) => {
      fn({
        req,
        Errorify
      })
        .then(next)
        .catch(next);
    };
  }

  routeHandler(fn) {
    const { db, services } = this.app;
    return (req, res, next) => {
      fn({
        req,
        db,
        body: req.body,
        User: db.User,
        Errorify,
        services
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
}

module.exports = AsyncWrapper;