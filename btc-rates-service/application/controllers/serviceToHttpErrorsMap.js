'use strict';

const {
  UnauthorizedError,
} = require('../../lib/http/errors');

module.exports = {
  AccessDeniedError: UnauthorizedError,
  RatesRetrievalError: 503,
};
