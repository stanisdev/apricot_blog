'use strict';

const { parse, join } = require('path');

const { env } = process;
const srcDir = parse(__dirname).dir;
const port = Number.parseInt(env.PORT);

const config = Object.seal({
  components: {
    src: srcDir,
    models: join(srcDir, 'models'),
    routes: join(srcDir, 'routes'),
    middlewares: join(srcDir, 'middlewares'),
    services: join(srcDir, 'services'),
  },
  app: {
    port: Number.isInteger(port) ? port : 3000,
  },
  http: {
    methods: ['get', 'post', 'put', 'delete']
  },
});

module.exports = config;