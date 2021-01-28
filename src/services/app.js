'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(bodyParser.json());

module.exports = app;
