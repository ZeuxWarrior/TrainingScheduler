'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedule","sessionId")),
      queryInterface.renameColumn("Schedule","sessionId","eventId"),
      queryInterface.changeColumn("Schedule","eventId", {
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedule","eventId")),
      queryInterface.renameColumn("Schedule","eventId","sessionId"),
      queryInterface.changeColumn("Schedule","sessionId", {
        references: {
          model: 'Sessions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ]);
  }
};
