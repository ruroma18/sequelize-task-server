const { User } = require('../models');
const createError = require('http-errors');

module.exports.findUser = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!user) {
      return next(createError(404, 'User not found'))
    }

    req.user = user;

    next();

  } catch (error) {
    next(error);
  }
}