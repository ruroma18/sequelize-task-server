'use strict';
const { Model } = require('sequelize');
const { isBefore } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      Task.belongsTo(Users, {foreignKey: 'userId'})
    }
  }
  Task.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      field: 'is_done',
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isDate: true,
        isValidDate: value => {
          if (isBefore(new Date(value), new Date())) {
            throw new Error('Bad date');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};