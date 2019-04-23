'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedules","sessionId")).
      then((value1) => {
        return queryInterface.renameColumn("Schedules","sessionId","eventId");
      }).then((value2) => {
        return queryInterface.changeColumn("Schedules","eventId", {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'compositeSession',
          references: {
            model: 'Events',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
      });
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(queryInterface.QueryGenerator.dropForeignKeyQuery("Schedules","eventId")).
      then((value1) => {
        return queryInterface.renameColumn("Schedules","eventId","sessionId");
      }).then((value2) => {
        return queryInterface.changeColumn("Schedules","sessionId", {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'compositeSession',
          references: {
            model: 'Sessions',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
      });
    }
};
