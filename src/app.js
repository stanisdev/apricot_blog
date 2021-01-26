'use strict';

const config = require('./config');
const { port } = config.app;
global.config = config;

const components = [
  config.directory.db,
  config.directory.middlewares,
  config.directory.services + '/logger.js',
  config.directory.validators,
  config.directory.routes,
];

async function start() {
  for (let a = 0; a < components.length; a++) {
    const component = require(components[a]);

    if (typeof component == 'function') {
      await component();
    }
  }
  const app = require(config.directory.services + '/app.js');

  app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
  });
}

start();