const { Task } = require('../models');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {

    const { body } = req;

    const task = await Task.create(body);

    if(!task) {
      return next(createError(400, 'Bad request'));
    }

    res.send({ data: task })
  } catch (error) {
    next(error)
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {

    const allTasks = await Task.findAll();

    if(!allTasks) {
      return next(createError(404, 'Tasks not found'));
    }

    res.send({ data: allTasks });

  } catch (error) {
    next(error)
  }
};

module.exports.findTaskById = async (req, res, next) => {
  try {

    const { task } = req;

    res.send({ data: task });
  } catch (error) {
    next(error)
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { task, body } = req;

    const updatedTask = await task.update(body, {
      returning: true,
    });

    res.send({ data: updatedTask })

  } catch (error) {
    next(error)
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { task } = req;

    await task.destroy();

    res.send({data: task});

  } catch (error) {
    next(error)
  }
};