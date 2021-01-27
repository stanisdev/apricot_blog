'use strict';

const { parse, join } = require('path');
const glob = require('glob');

const { env } = process;
const srcDir = parse(__dirname).dir;
const port = Number.parseInt(env.PORT);

const config = Object.seal({
  directory: {
    src: srcDir,
    db: join(srcDir, 'db'),
    routes: join(srcDir, 'routes'),
    middlewares: join(srcDir, 'middlewares'),
    services: join(srcDir, 'services'),
    validators: join(srcDir, 'validators'),
  },
  app: {
    port: Number.isInteger(port) ? port : 3000,
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
    }, {})
});

module.exports = config;