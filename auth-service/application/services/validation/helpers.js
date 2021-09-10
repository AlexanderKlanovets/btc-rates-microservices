'use strict';

const Joi = require('joi');

const { userValidationSchema } = require('./schemas');
const { UserDataValidationError } = require('../errors');

const validateUserDataOrThrow = (userData) => {
  try {
    Joi.assert(userData, userValidationSchema);
  } catch (error) {
    const errorDescription = error.details[0].message;

    throw new UserDataValidationError(errorDescription);
  }
};

module.exports = {
  validateUserDataOrThrow,
};
