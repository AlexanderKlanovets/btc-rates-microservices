'use strict';

const serviceToHttpErrorsMap = require('./serviceToHttpErrorsMap');

class BtcRatesController {
  constructor(accessCheckService, btcService) {
    this.accessCheckService = accessCheckService;
    this.btcService = btcService;
  }

  async getBtcUahExchangeRate(req, res, next) {
    try {
      const { authorization } = req.headers;

      await this.accessCheckService.verifyAccess(authorization);

      const btcUahExchangeRate = await this.btcService.getBtcUahExchangeRate();

      res.status(200).json({ btcUahExchangeRate });
    } catch (err) {
      const httpError = serviceToHttpErrorsMap[err.name];

      next(httpError ? new httpError(err.message) : err);
    }
  }
}

module.exports = BtcRatesController;
