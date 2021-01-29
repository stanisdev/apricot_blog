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
  directory: {
    src: srcDir,
    db: join(srcDir, 'db'),
    routes: join(srcDir, 'routes'),
    middlewares: join(srcDir, 'middlewares'),
    services: join(srcDir, 'services'),
    validators: join(srcDir, 'validators'),
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
  }
};

module.exports = global.config = merge(
  config, environments[env.NODE_ENV]
);