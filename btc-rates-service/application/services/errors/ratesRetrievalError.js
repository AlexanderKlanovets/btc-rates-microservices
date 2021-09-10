'use strict';

class RatesRetrievalError extends Error {
  constructor() {
    super('Unable to get the BTC-UAH exchange rate.');

    this.name = 'RatesRetrievalError';
  }
}

module.exports = RatesRetrievalError;
