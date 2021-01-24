'use strict';

class Auth {
  constructor() {
    this.prefix = '/auth';
  }

  ['GET /register'](req, res) {
    res.json({ success: true });
  }

  ['POST /login']() {}
}

module.exports = Auth;