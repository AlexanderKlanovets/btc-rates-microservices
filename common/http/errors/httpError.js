'use strict';

class HttpError extends Error {
  constructor(name, httpStatus, message) {
    super(message);

    this.name = name;
    this.httpStatus = httpStatus;
  }
}

module.exports = HttpError;
