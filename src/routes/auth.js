'use strict';

const { strictEqual: equal } = require('assert');

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
  async ['POST /login | <*>']({
    body: { email, password },
    Errorify,
    services,
    User,
    req
  }) {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'salt', 'password']
    });
    try {
      equal(await user.isCorrectPassword(password), true);
    } catch {
      throw Errorify.create({
        message: req.t('auth.wrong-password')
      });
    }
    return services.jwt.getTokens(user.id);
  }
}

module.exports = Auth;