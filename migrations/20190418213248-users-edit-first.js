'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users","first","firstName");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users","firstName","first");
  }
};
