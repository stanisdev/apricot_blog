'use strict';

const config = require('./config');
global.config = config;

require(config.components.middlewares);
require(config.components.routes);
const app = require(config.components.services + '/app.js');

const { port } = config.app;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});