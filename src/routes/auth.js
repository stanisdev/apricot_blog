'use strict';

class Auth {
  constructor() {
    this.prefix = '/auth';
  }

  async ['POST /register | <*>']({ req, res, db, Errorify }) {
    throw Errorify.create({
      message: 'Wrong login/password'
    });
    res.json({ success: true });
  }

  async ['POST /login']() {}
}

module.exports = Auth;