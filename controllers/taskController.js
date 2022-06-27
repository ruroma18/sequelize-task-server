const { Task } = require('../models');

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
      throw new Error('Cant update task!');
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
      throw new Error(`Cant delete task with id ${id}`)
    }

    res.send(`Task with id ${id} deleted`);

  } catch (error) {
    next(error)
  }
};