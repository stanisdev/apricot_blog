'use strict';

const config = require('./config');
const { services, directory, port } = config;
const logger = require(services.logger);

const components = [
  directory.db,
  directory.middlewares,
  directory.validators,
  directory.routes,
];

async function start(done) {
  for (let a = 0; a < components.length; a++) {
    const component = require(components[a]);

    if (typeof component == 'function') {
      await component();
    }
  }
  let server;
  const app = require(services.app);
  require(services.errorHandler);

  server = app.listen(port, () => {
    logger.info(`The server is listening on port ${port}`);
    done(server);
  });
}

module.exports = new Promise(
  (resolve, reject) =>
    start(resolve).catch(reject)
);