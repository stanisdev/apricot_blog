'use strict';

const { config } = global;
const logger = require('pino')({
  level: config.logger.level
});

const httpLogger = require('pino-http')({
  logger,
  serializers: config.logger.serializers
});
const app = require(global.config.services.app);
app.use(httpLogger);

module.exports = logger;
