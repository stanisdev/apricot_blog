'use strict';

const validators = {
  register: {
    body: {
      properties: {
        name: {
          type: 'string',
          maxLength: 40,
          minLength: 1
        },
        email: {
          type: 'string',
          format: 'email',
          maxLength: 50,
          minLength: 6
        },
        password: {
          type: 'string',
          minLength: 5
        }
      },
      required: ['name', 'email', 'password']
    }
  }
};

module.exports = validators;