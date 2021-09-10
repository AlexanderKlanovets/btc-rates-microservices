'use strict';

const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().max(50).email()
    .required(),
  password: Joi.string().min(6).max(50)
    .required(),
});

module.exports = userValidationSchema;
