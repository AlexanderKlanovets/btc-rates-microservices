'use strict';

const HttpError = require('./httpError');

class NotFoundError extends HttpError {
  constructor(message) {
    super('NotFoundError', 404, message);
  }
}

module.exports = NotFoundError;
