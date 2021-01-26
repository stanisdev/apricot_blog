'use strict';

const morgan = require('morgan');

const app = require(global.config.directory.services + '/app.js');
app.use(morgan('tiny'));