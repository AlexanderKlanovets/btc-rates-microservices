'use strict';

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);

    this.name = 'AccessDeniedError';
  }
}

module.exports = AccessDeniedError;
