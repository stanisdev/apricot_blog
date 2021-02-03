'use strict';

const { parse, join } = require('path');
const { merge } = require('lodash');
const glob = require('glob');

const { env } = process;
const srcDir = parse(__dirname).dir;

const environments = {
  production: {
    port: 3000
  },
  development: {
    port: 3001
  },
  test: {
    port: 3002,
    logger: {
      level: 'silent'
    }
  }
};

const config = {
  directories: {
    src: srcDir,
    db: join(srcDir, 'db'),
    routes: join(srcDir, 'routes'),
    middlewares: join(srcDir, 'middlewares'),
    validators: join(srcDir, 'validators'),
    locales: join(srcDir, 'locales'),
  },
  http: {
    methods: ['get', 'post', 'put', 'delete']
  },
  services: glob
    .sync(join(srcDir, 'services') + '/!(index)*.js')
    .reduce((prev, file) => {
      const { name } = parse(file);
      prev[name] = file;

      return prev;
    }, {}),
  logger: {
    level: 'info',
    serializers: {
      req (req) {
        return {
          id: Math.random().toString().slice(-4),
          method: req.method,
          url: req.url,
          hostname: req.hostname,
          remoteAddress: req.ip
        }
      },
      res() {}
    }
  },
  jwt: {
    secret: env.JWT_SECRET || 't52ZHdGZH8WaV37aBVu',
    expiration: {
      access: 1000 * 60 * 30, // 30 minutes
      refresh: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
  },
  constants: require('./constants')
};

module.exports = global.config = merge(
  config, environments[env.NODE_ENV]
);