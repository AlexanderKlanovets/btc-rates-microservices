'use strict';

const { RatesRetrievalError } = require('./errors');

class BtcRatesService {
  constructor(btcRatesProvider) {
    this.btcRatesProvider = btcRatesProvider;
  }

  getBtcUahExchangeRate() {
    try {
      return this.btcRatesProvider.getBtcUahExchangeRate();
    } catch (err) {
      throw new RatesRetrievalError();
    }
  }
}

module.exports = BtcRatesService;
