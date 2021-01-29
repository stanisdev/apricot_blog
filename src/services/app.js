'use strict';

const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = require('express')();

app.use(helmet());
app.use(bodyParser.json());

module.exports = app;
