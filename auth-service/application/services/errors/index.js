'use strict';

const InvalidCredentialsError = require('./invalidCredentialsError');
const UserDataValidationError = require('./userDataValidationError');
const UserNotFoundError = require('./userNotFoundError');
const UserAlreadyExistsError = require('./userAlreadyExistsError');
const TokenVerificationError = require('./tokenVerificationError');

module.exports = {
  InvalidCredentialsError,
  UserDataValidationError,
  UserNotFoundError,
  UserAlreadyExistsError,
  TokenVerificationError,
};
