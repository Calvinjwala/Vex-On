"use strict";

module.exports = function(sequelize, DataTypes) {
  var Flag = sequelize.define("Flag", {
    country: DataTypes.STRING,
    capital: DataTypes.STRING,
    continent:DataTypes.STRING,
    info: DataTypes.TEXT,
    infoTwo: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Flag;
};
