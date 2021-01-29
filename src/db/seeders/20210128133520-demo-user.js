'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [{
      id: 10,
      name: 'Sydnie Hayes',
      email: 'zander99@yahoo.com',
      password: 'aGQdxF7inR',
      salt: 'V9YwP',
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
