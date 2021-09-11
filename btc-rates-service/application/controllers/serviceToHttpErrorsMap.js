'use strict';

const {
  UnauthorizedError,
} = require('../../../common/http/errors');

module.exports = {
  AccessDeniedError: UnauthorizedError,
  RatesRetrievalError: 503,
};
