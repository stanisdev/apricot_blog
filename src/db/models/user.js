'use strict';

const { Model } = require('sequelize');
const { nanoid } = require('nanoid/async');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Instance methods
     */
    async encryptPassword() {
      const salt = await nanoid(5);
      const hash = await bcrypt.hash(this.password + salt, 10);
      this.salt = salt;
      this.password = hash;
    }

    isCorrectPassword(password) {
      const data = password + this.salt;
      return bcrypt.compare(data, this.password);
    }

    static async emailExists(email) {
      const user = await User.findOne({
        where: { email },
        attributes: ['id']
      });
      return user instanceof Object;
    }

    static associate(models) {
      User.hasMany(models.Token);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40]
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [6, 50]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 60
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 5
      }
    },
    state: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};