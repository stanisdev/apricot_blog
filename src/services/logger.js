'use strict';

const morgan = require('morgan');

const app = require(global.config.services.app);
app.use(morgan('tiny'));