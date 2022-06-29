const { Task } = require('../models');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {

    const { user, body } = req;

    const task = await user.createTask(body);

    if (!task) {
      return next(createError(400, 'Bad request'));
    }

    res.send({ data: task })
  } catch (error) {
    next(error)
  }
};

module.exports.findTasks = async (req, res, next) => {
  try {

    const { user } = req;

    const foundTasks = await user.getTasks();

    if (!foundTasks) {
      return next(createError(404, 'Tasks not found'));
    }

    res.send({ data: foundTasks });

  } catch (error) {
    next(error)
  }
};

module.exports.findTaskById = async (req, res, next) => {
  try {

    const { user: { id: userId }, task: { id: taskId } } = req;

    const foundTask = await Task.findOne({ where: { id: taskId, userId } })

    res.send({ data: foundTask });
  } catch (error) {
    next(error)
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { user: { id: userId }, task: { id: taskId }, body } = req;

    const [updatedRow, [updatedTask]] = await Task.update(body, {
      where: { id: taskId, userId },
      returning: true,
    });

    if (updatedRow !== 1) {
      return next(createError(404, 'Task not found'));
    }

    res.send({ data: updatedTask })

  } catch (error) {
    next(error)
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { user: { id: userId }, task, task: { id: taskId } } = req;

    const deletedRow = await Task.destroy({ where: { id: taskId, userId } });

    if (deletedRow !== 1) {
      return next(createError(404, 'Task not found'));
    }

    res.send({ data: task });

  } catch (error) {
    next(error)
  }
};