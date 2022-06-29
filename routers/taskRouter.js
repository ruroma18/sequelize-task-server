const express = require('express');
const taskRouter = express.Router();

const TaskController = require('../controllers/taskController');
const { findTask } = require('../middlewares/tasksMW')

taskRouter.post('/', TaskController.createTask);

taskRouter.get('/', TaskController.findTasks);

taskRouter.get('/:taskId', findTask, TaskController.findTaskById);

taskRouter.put('/:taskId', findTask, TaskController.updateTask);

taskRouter.delete('/:taskId', findTask, TaskController.deleteTask);

module.exports = taskRouter;