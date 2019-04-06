'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venues = sequelize.define('Venues', {
    name: DataTypes.STRING,
    address: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.CHAR(2),
    zipCode: DataTypes.BIGINT
  }, {});
  Venues.associate = function(models) {
    // associations can be defined here
  };
  return Venues;
};