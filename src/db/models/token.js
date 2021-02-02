'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate({ User }) {
      Token.belongsTo(User);
    }
  };

  Token.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 400]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Token',
    timestamps: false,
  });

  return Token;
};