'use strict';

const HttpError = require('./httpError');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
