'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    eventId: {
      type: DataTypes.INTEGER,
      unique: 'compositeEvent'
    },
    venueId: {
      type: DataTypes.INTEGER,
      unique: 'compositeEvent'
    },
    trainerId: DataTypes.INTEGER,
    roomNum: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    topicName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Sessions.associate = function(models) {
    models.Sessions.belongsTo(models.Events, {
      foreignKey: "eventId",
      sourceKey: "id"
    });
    models.Sessions.belongsTo(models.Venues, {
      foreignKey: "venueId",
      sourceKey: "id"
    });
    models.Sessions.belongsTo(models.Users, {
      foreignKey: "trainerId",
      sourceKey: "id"
    });
  };
  return Sessions;
};