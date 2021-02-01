'use strict';

class Auth {
  constructor() {
    this.prefix = '/auth';
  }

  /**
   * Register a new user
   */
  async ['POST /register | <*>']({
    body: { email, name, password },
    Errorify,
    User,
    req,
  }) {
    const user = User.build({
      name,
      email,
      password
    });
    if (await User.emailExists(email)) {
      throw Errorify.create({
        message: req.t('auth.email-registered')
      });
    }
    await user.encryptPassword();
    await user.save();
  }

  /**
   * Login in system
   */
  async ['POST /login']() {}
}

module.exports = Auth;