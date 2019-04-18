'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [{
      name: 'Miles Technologies',
      address: 100,
      street: 'Mt Holly Bypass',
      city: 'Lumberton',
      state: 'NJ',
      zipCode: 8048,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  }
};
