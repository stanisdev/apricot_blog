'use strict';

const { config } = global;
const app = require(config.components.services + '/app');
const glob = require('glob');
const { parse } = require('path');

const middlewares = {};
glob
  .sync(__dirname + '/!(index)*.js')
  .forEach(file => {
    
    const name = parse(file).name.toLowerCase();
    middlewares[name] = require(file);
  });

app.set('middlewares', middlewares);
