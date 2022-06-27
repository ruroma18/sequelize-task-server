const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/taskController');

router.post('/tasks', TaskController.createTask);

router.get('/tasks', TaskController.findAllTasks);

router.get('/tasks/:id', TaskController.findTaskById);

router.put('/tasks/:id', TaskController.updateTask);

router.delete('/tasks/:id', TaskController.deleteTask);

module.exports = router;