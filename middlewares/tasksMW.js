const { Task } = require('../models');
const createError = require('http-errors');

module.exports.findTask = async (req, res, next) => {
  try {

    const { params: { id } } = req;
    
    const task = await Task.findByPk(id);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    req.task = task;

    next()

  } catch (error) {
    next(error);
  }
}