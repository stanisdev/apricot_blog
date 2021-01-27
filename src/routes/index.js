'use strict';

const { config } = global;
const app = require(config.services.app);
const wrapper = require(config.services.wrapper);
const Errorify = require(config.services.errorify);

const middlewares = app.get('middlewares');
const validators = app.get('validators');
const { parse } = require('path');
const glob = require('glob');

const Ajv = require('ajv');
const ajv = new Ajv();

class Route {
  constructor() {
    this.files = glob.sync(__dirname + '/!(index)*.js');
  }

  iterateFiles() {
    for (let a = 0; a < this.files.length; a++) {
      const file = this.files[a];
      const Class = require(file);

      if (!Class.toString().startsWith('class')) {
        return;
      }
      this.Class = Class;
      this.fileName = parse(file).name;
      this.#routes();
    }
  }

  #routes() {
    const { Class } = this;
    const routes = Object.getOwnPropertyNames(Class.prototype);
    const prefix = this.#prefix();

    for (let b = 0; b < routes.length; b++) {
      const route = routes[b];
      const [method, url] = route.trim().toLowerCase().split(' ');
      
      if (config.http.methods.includes(method)) {
        this.url = prefix + url;
        this.method = method;
        this.#handler(route);
      }
    }
  }

  #handler(route) {
    const { Class } = this;
    const fn = Class.prototype[route];
    let handlers = [];
    
    if (route.includes('|')) {
      this.route = route;
      this.#middleware();
      handlers.push(
        this.#validators()
      );
    }
    handlers.push(fn);
    handlers = handlers
      .filter(h => typeof h == 'function')
      .map(h => {
        if (h.toString().includes('async ')) {
          return wrapper(h);
        }
        return h;
      });

    app[this.method](
      this.url,
      handlers
    );
  }

  #middleware() {
    const search = /\|([a-z\d\s,]+)(\<|$)/i.exec(this.route);
    if (!Array.isArray(search)) {
      return;
    }
    const pattern = search[1].trim();
    if (pattern.length < 1) {
      return;
    }
    let values = [];

    if (pattern.includes(',')) {
      values.push(...pattern.split(/\s*,\s*/));
    } else {
      values.push(pattern);
    }
  }

  #validators() {
    const search = /\<([^\>]+)\>/.exec(this.route);
    if (!Array.isArray(search)) {
      return;
    }
    const validator = search[1];
    if (validator == '*') {
      const url = this.route.split(' ')[1].slice(1);
      const schemas = validators[this.fileName][url];

      if (!(schemas instanceof Object)) {
        throw new Error(
          'The schema for the route ' +
          this.route +
          'is not defined'
        );
      }
      return (req, res, next) => {
        Object
          .entries(schemas)
          .forEach(([method, schema]) => {
            schema.type = 'object';
  
            const validate = ajv.compile(schema);
            const data = req[method];
        
            let error;
            if (!validate(data)) {
              console.log(validate.errors[0]);
              const { message } = validate.errors[0];
              error = Errorify.create({
                status: 400,
                message
              });
            }
            next(error);
          });
      };
    }
  }

  #prefix() {
    const { Class } = this;
    const instance = new Class();
    if (instance.hasOwnProperty('prefix')) {
      return instance.prefix;
    }
    const [name] = Class.toString().slice(6).split(' ');
    return `/${name.toLowerCase()}`;
  }
}

new Route().iterateFiles();