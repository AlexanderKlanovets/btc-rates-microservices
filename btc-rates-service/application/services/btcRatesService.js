'use strict';

const { RatesRetrievalError } = require('./errors');

class BtcRatesService {
  constructor(btcRatesProvider) {
    this.btcRatesProvider = btcRatesProvider;
  }

  async getBtcUahExchangeRate() {
    try {
      const rate = await this.btcRatesProvider.getBtcUahExchangeRate();

      return rate;
    } catch (err) {
      throw new RatesRetrievalError(err.message);
    }
  }
}

module.exports = BtcRatesService;
