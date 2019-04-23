'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedules","sessionId")).
      then(queryInterface.renameColumn("Schedules","sessionId","eventId")).
      then(queryInterface.changeColumn("Schedules","eventId", {
        type: Sequelize.INTEGER,
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedules","eventId")).
      then(queryInterface.renameColumn("Schedules","eventId","sessionId")).
      then(queryInterface.changeColumn("Schedules","sessionId", {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sessions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    );
  }
};
