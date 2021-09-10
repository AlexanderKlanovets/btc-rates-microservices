'use strict';

class BtcRatesService {
  constructor(btcRatesProvider) {
    this.btcRatesProvider = btcRatesProvider;
  }

  getBtcUahExchangeRate() {
    return this.btcRatesProvider.getBtcUahExchangeRate();
  }
}

module.exports = BtcRatesService;
