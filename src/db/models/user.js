'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: 60
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};