'use strict';

class Auth {
  constructor() {
    this.prefix = '/auth';
  }

  async ['POST /register | <*>']({ req, res, db }) {
    res.json({ success: true });
  }

  async ['POST /login']() {}
}

module.exports = Auth;