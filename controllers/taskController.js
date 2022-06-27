const { Task } = require('../models');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {

    const { body } = req;

    const task = await Task.create(body);

    res.send({ data: task })
  } catch (error) {
    next(error)
  }
};

module.exports.findAllTasks = async (req, res, next) => {
  try {

    const allTasks = await Task.findAll();

    res.send({ data: allTasks });

  } catch (error) {
    next(error)
  }
};

module.exports.findTaskById = async (req, res, next) => {
  try {

    const { params: { id } } = req;

    const taskById = await Task.findByPk(id);

    if (!taskById) {
      return next(createError(404, 'Task not found'));
    }

    res.send({ data: taskById });
  } catch (error) {
    next(error)
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { params: { id }, body } = req;

    const [rowsUpdated, [task]] = await Task.update(body, {
      where: { id },
      returning: true,
    });

    if (rowsUpdated !== 1) {
      return next(createError(400, 'Task dont update'))
    }

    res.send({ data: task })

  } catch (error) {
    next(error)
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const deletedRows = await Task.destroy({
      where: { id }
    })

    if (deletedRows !== 1) {
      return next(createError(404, 'No such task to delete'))
    }

    res.send(`Task with id ${id} deleted`);

  } catch (error) {
    next(error)
  }
};