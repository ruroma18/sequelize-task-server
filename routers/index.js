const express = require('express');
const router = express.Router();

const taskRouter = require('./taskRouter');
const userRouter = require('./userRouter');

router.use('/users', userRouter);
router.use('/users/tasks', taskRouter);

module.exports = router;