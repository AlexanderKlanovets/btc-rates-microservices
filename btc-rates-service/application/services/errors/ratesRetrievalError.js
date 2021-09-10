'use strict';

class RatesRetrievalError extends Error {
  constructor(message) {
    super(message);

    this.name = 'RatesRetrievalError';
  }
}

module.exports = RatesRetrievalError;
