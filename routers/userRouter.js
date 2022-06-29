const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/userController')
const { findUser } = require('../middlewares/userMW');
const taskRouter = require('./taskRouter');

userRouter.post('/', UserController.createUser);

userRouter.get('/', UserController.findUsers);

userRouter.get('/:userId', findUser, UserController.findUserById);

userRouter.put('/:userId', findUser, UserController.updateUser);

userRouter.delete('/:userId', findUser, UserController.deleteUser);

userRouter.use('/:userId/tasks', findUser, taskRouter);

module.exports = userRouter;