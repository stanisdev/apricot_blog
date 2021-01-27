'use strict';

const db = require('./models');
const app = require(global.config.services.app);

app.set('db', db);

module.exports = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};