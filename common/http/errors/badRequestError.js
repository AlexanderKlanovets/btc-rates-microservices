'use strict';

const HttpError = require('./httpError');

class BadRequestError extends HttpError {
  constructor(message) {
    super('BadRequestError', 400, message);
  }
}

module.exports = BadRequestError;
