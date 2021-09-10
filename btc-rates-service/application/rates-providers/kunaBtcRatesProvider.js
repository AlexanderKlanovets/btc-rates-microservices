/* eslint class-methods-use-this: 0 */

'use strict';

const { makeHttpsGetRequest } = require('../../lib/utils');

class KunaBtcRatesProvider {
  async getBtcUahExchangeRate() {
    // API Reference: https://docs.kuna.io/docs
    const API_URL = 'https://api.kuna.io/v3/tickers?symbols=btcuah';
    const LATEST_PRICE_INDEX = 7;

    const options = {
      headers: {
        accept: 'application/json',
      },
    };

    const data = await makeHttpsGetRequest(API_URL, options);

    return data[0][LATEST_PRICE_INDEX];
  }
}

module.exports = KunaBtcRatesProvider;
