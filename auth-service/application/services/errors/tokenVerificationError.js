'use strict';

class TokenVerificationError extends Error {
  constructor(message) {
    super(message);

    this.name = 'TokenVerificationError';
  }
}

module.exports = TokenVerificationError;
