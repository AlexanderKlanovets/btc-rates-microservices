'use strict';

class BtcRatesController {
  constructor(btcService) {
    this.btcService = btcService;
  }

  async getBtcUahExchangeRate(req, res) {
    try {
      const btcUahExchangeRate = await this.btcService.getBtcUahExchangeRate();

      res.status(200).json({ btcUahExchangeRate });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BtcRatesController;
