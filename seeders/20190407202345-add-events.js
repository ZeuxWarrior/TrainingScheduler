'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [{
        name: 'PHP',
        startDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        name: 'Ruby',
        startDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
