const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/taskController');
const { findTask } = require('../middlewares/tasksMW');

router.post('/tasks', TaskController.createTask);

router.get('/tasks', TaskController.findAllTasks);

router.get('/tasks/:id', findTask, TaskController.findTaskById);

router.put('/tasks/:id', findTask, TaskController.updateTask);

router.delete('/tasks/:id', findTask, TaskController.deleteTask);

module.exports = router;