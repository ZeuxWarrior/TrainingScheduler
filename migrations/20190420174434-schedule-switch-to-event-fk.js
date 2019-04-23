'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Schedules","sessionId","eventId").
      then((value1) => {
        return queryInterface.sequelize.query("ALTER TABLE Schedules DROP FOREIGN KEY schedules_ibfk_2;");
      }).then((value2) => {
        return queryInterface.sequelize.query("ALTER TABLE Schedules ADD CONSTRAINT Schedules_eventId_foreign_idx FOREIGN KEY (eventId) REFERENCES Events(id);");
      });
    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Schedules","eventId","sessionId").
      then((value1) => {
        return queryInterface.sequelize.query("ALTER TABLE Schedules DROP FOREIGN KEY Schedules_eventId_foreign_idx;");
      }).then((value2) => {
        return queryInterface.sequelize.query("ALTER TABLE Schedules ADD CONSTRAINT schedules_ibfk_2 FOREIGN KEY (sessionId) REFERENCES Sessions(id);");
      });
    }
};
