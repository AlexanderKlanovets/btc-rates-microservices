'use strict';

class UserDataValidationError extends Error {
  constructor(description) {
    super(`Error adding new user. Reason: ${description}.`);

    this.name = 'UserDataValidationError';
  }
}

module.exports = UserDataValidationError;
