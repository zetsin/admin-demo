'use strict';
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('good', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
};
