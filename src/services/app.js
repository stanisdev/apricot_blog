'use strict';

const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');

class App {
  instance;

  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());
    this.instance = app;
  }

  async build() {
    const { directories, services } = this.config;
    const { instance } = this;

    this.db = await require(directories.db)();
    this.middlewares = require(directories.middlewares);
    this.validators = require(directories.validators);
    const Route = require(directories.routes);
    const i18next = require(services.i18next);
    
    instance.use(i18next);
    new Route(this).iterateFiles();
    instance.use(require(services.error));
    this.logger();
    instance.use(require(services[404]));
  }

  logger() {
    const { level, serializers } = this.config.logger;
    this.logger = pino({ level });
    this.instance.use(
      pinoHttp({
        logger: this.logger,
        serializers
      })
    );
  }

  listen() {
    const { port } = this.config;
    return new Promise((resolve, reject) => {
      this.server = this.instance.listen(port, () => {
        this.logger.info('The server is listening on port ' + port);
        resolve();
      });
    });
  }
}

module.exports = App;