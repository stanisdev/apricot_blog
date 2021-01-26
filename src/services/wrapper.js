'use strict';

const app = require(global.config.directory.services + '/app.js');
const db = app.get('db');

const wrapper = (fn) => {
  return (req, res, next) => {
    fn({ req, res, db })
      .then(next)
      .catch(({ message, stack }) => {
        res.status(500).json({ // @todo: define another way of processing
          message,
          success: false
        });
        console.error(stack);
      });
  };
};

module.exports = wrapper;