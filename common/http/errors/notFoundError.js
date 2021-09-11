'use strict';

const HttpError = require('./httpError');

class NotFoundError extends HttpError {
  constructor(message) {
    super(404, message);
  }
}

module.exports = NotFoundError;
