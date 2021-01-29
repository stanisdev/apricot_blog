'use strict';

const glob = require('glob');
const { parse } = require('path');

const validators = {};
glob
  .sync(__dirname + '/!(index)*.js')
  .forEach(file => {
    const name = parse(file).name.toLowerCase();
    validators[name] = require(file);
  });

module.exports = validators;
