'use strict';

class HttpError extends Error {
  constructor(httpStatus, message) {
    super(message);

    this.httpStatus = httpStatus;
  }
}

module.exports = HttpError;
