'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: DataTypes.DATEONLY,
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    attendanceLimit: {
      type:DataTypes.INTEGER,
      defaultValue: 10
    }
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};