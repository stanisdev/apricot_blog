'use strict';

const config = require('./config');
const { port } = config.app;
const { services, directory } = config;
global.config = config;

const components = [
  directory.db,
  directory.middlewares,
  services.logger,
  directory.validators,
  directory.routes,
];

async function start() {
  for (let a = 0; a < components.length; a++) {
    const component = require(components[a]);

    if (typeof component == 'function') {
      await component();
    }
  }
  const app = require(services.app);
  require(services.errorHandler);

  app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
  });
}

start();