'use strict';

const { config } = global;
const app = require(config.directory.services + '/app');
const glob = require('glob');
const { parse } = require('path');

const validators = {};
glob
  .sync(__dirname + '/!(index)*.js')
  .forEach(file => {

    const name = parse(file).name.toLowerCase();
    validators[name] = require(file);
  });

app.set('validators', validators);
