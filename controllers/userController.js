const { User } = require('../models');
const createError = require('http-errors');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    if (!user) {
      return next(createError(400, 'Cant create user'));
    }

    res.send({ data: user })

  } catch (error) {
    next(error);
  }
};

module.exports.findUsers = async (req, res, next) => {
  try {

    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

    res.send({ data: users });

  } catch (error) {
    next(error);
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {

    const { user } = req;

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { body, user } = req;

    const updatedUser = await user.update(body, {
      returning: true
    })

    res.send({ data: updatedUser });

  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {

    const { user } = req;

    await user.destroy();

    res.send({ data: user });

  } catch (error) {
    next(error);
  }
};

