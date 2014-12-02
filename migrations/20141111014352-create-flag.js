"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Flags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      country: {
        type: DataTypes.STRING
      },
      capital: {
        type: DataTypes.STRING
      },
      continent: {
        type: DataTypes.STRING
      },
      info: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Flags").done(done);
  }
};