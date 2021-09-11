'use strict';

const BadRequestError = require('./badRequestError');
const NotFoundError = require('./notFoundError');
const UnauthorizedError = require('./unauthorizedError');
const ServiceUnavailableError = require('./serviceUnavailableError');

module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ServiceUnavailableError,
};
