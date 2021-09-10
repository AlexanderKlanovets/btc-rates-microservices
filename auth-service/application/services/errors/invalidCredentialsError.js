'use strict';

class InvalidCredentialsError extends Error {
  constructor() {
    super('The email or password is incorrect');

    this.name = 'InvalidCredentialsError';
  }
}

module.exports = InvalidCredentialsError;
