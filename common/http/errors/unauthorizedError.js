'use strict';

const HttpError = require('./httpError');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super('UnauthorizedError', 401, message);
  }
}

module.exports = UnauthorizedError;
