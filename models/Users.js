'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Task }) {
      User.hasMany(Task, { foreingKey: 'userId' })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: false,
      validate: {
        isAlpha: true,
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      field: 'is_male'
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: true,
        isDate: true,
        isValidDate: value => {
          if (isAfter(new Date(value), new Date())) {
            throw new Error('Incorrect date value')
          }
        }
      }

    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};