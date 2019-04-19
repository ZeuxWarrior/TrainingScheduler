'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users","last","lastName");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users","lastName","last");
  }
};
