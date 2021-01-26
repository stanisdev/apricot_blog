'use strict';

const db = require('./models');
const app = require(global.config.directory.services + '/app.js');

app.set('db', db);

module.exports = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};