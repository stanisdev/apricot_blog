'use strict';

const db = require('./models');

module.exports = async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
  return db;
};