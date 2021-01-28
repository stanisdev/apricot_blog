'use strict';

const middlewares = {
  async mdwr_1({ req, res, db }) {
  },
  async mdwr_2({ req, res, Errorify }) {
    throw Errorify.create({
      status: 402,
      message: 'Do your best!'
    });
  },
  async auth() {}
};

module.exports = middlewares;