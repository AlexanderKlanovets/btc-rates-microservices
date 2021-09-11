'use strict';

const HttpError = require('./httpError');

class ServiceUnavailableError extends HttpError {
  constructor(message) {
    super(503, message);
  }
}

module.exports = ServiceUnavailableError;
