'use strict';

const wrapper = (fn) => {
  return (req, res) => {
    fn({ req, res })
      .then(Object)
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