'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedules', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'compositeSession'
    },
    eventId: {
      type: DataTypes.INTEGER,
      unique: 'compositeSession'
    }
  }, {});
  Schedule.associate = function(models) {
    models.Schedule.belongsTo(models.Users, {
      foreignKey: "userId",
      sourceKey: "id"
    });
    models.Schedule.belongsTo(models.Events, {
      foreignKey: "eventId",
      sourceKey: "id"
    });
  };
  return Schedule;
};