'use strict';

class Errorify {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static create({
    status = 400,
    message = 'Sorry, some input parameters that you passed are incorrect'
  }) {
    return new this(status, message);
  }
}

module.exports = Errorify;