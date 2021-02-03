'use strict';

const jwt = require('jsonwebtoken');
const moment = require('moment');
const { promisify } = require('util');
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

class Jwt {
  constructor({ db, config }) {
    this.config = config;
    this.db = db;
  }

  async getTokens(userId) {
    const { expiration } = this.config.jwt;
    const { constants } = this.config;

    const access = {
      userId,
      expires: moment().add(expiration.access, 'milliseconds'),
      tokenType: constants.TOKENS.ACCESS
    };
    const refresh = {
      userId,
      expires: moment().add(expiration.refresh, 'milliseconds'),
      tokenType: constants.TOKENS.REFRESH
    };

    const result = {
      access: {
        token: await this.#sign(access),
        expires: access.expires.toDate()
      },
      refresh: {
        token: await this.#sign(refresh),
        expires: refresh.expires.toDate()
      }
    };
    await this.#saveRefresh(userId, result.refresh);
    return result;
  }

  updateTokens() {}

  verifyAccessToken() {}

  #sign({ userId, expires, tokenType }) {
    const payload = {
      data: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type: tokenType
    };
    return sign(payload, this.config.jwt.secret);
  }

  #saveRefresh(userId, { token, expires }) {
    return this.db.Token.create({
      token,
      userId,
      type: this.config.constants.TOKENS.REFRESH,
      expires
    }, { returning: false });
  }
}

module.exports = Jwt;