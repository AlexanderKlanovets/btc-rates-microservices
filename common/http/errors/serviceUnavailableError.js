'use strict';

const HttpError = require('./httpError');

class ServiceUnavailableError extends HttpError {
  constructor(message) {
    super('ServiceUnavailableError', 503, message);
  }
}

module.exports = ServiceUnavailableError;
