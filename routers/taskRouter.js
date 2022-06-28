const express = require('express');
const taskRouter = express.Router();

const TaskController = require('../controllers/taskController');
const { findTask } = require('../middlewares/tasksMW');

taskRouter.post('/', TaskController.createTask);

taskRouter.get('/', TaskController.findAllTasks);

taskRouter.get('/:id', findTask, TaskController.findTaskById);

taskRouter.put('/:id', findTask, TaskController.updateTask);

taskRouter.delete('/:id', findTask, TaskController.deleteTask);

module.exports = taskRouter;