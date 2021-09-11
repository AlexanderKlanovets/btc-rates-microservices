'use strict';

const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require('../../../common/http/errors');

module.exports = {
  InvalidCredentialsError: UnauthorizedError,
  UserAlreadyExistsError: BadRequestError,
  UserDataValidationError: BadRequestError,
  UserNotFoundError: NotFoundError,
  TokenVerificationError: UnauthorizedError,
};
