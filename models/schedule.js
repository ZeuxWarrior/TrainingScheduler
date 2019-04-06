'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'compositeSession'
    },
    sessionId: {
      type: DataTypes.INTEGER,
      unique: 'compositeSession'
    }
  }, {});
  Schedule.associate = function(models) {
    models.Schedule.belongsTo(models.Users, {
      foreignKey: "userId",
      sourceKey: "id"
    });
    models.Schedule.belongsTo(models.Sessions, {
      foreignKey: "sessionId",
      sourceKey: "id"
    });
  };
  return Schedule;
};