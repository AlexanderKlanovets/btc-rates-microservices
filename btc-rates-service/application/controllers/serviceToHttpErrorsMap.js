'use strict';

const {
  UnauthorizedError,
  ServiceUnavailableError,
} = require('../../../common/http/errors');

module.exports = {
  AccessDeniedError: UnauthorizedError,
  RatesRetrievalError: ServiceUnavailableError,
};
