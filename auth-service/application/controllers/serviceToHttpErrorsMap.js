'use strict';

const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require('../../lib/http/errors');

module.exports = {
  InvalidCredentialsError: UnauthorizedError,
  UserAlreadyExistsError: BadRequestError,
  UserDataValidationError: BadRequestError,
  UserNotFoundError: NotFoundError,
  TokenVerificationError: UnauthorizedError,
};
