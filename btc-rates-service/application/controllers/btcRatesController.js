'use strict';

const serviceToHttpErrorsMap = require('./serviceToHttpErrorsMap');

class BtcRatesController {
  constructor(accessCheckService, btcService) {
    this.accessCheckService = accessCheckService;
    this.btcService = btcService;
  }

  passErrorToErrorHandler = (err, errorHandler) => {
    const HttpError = serviceToHttpErrorsMap[err.name];

    errorHandler(HttpError ? new HttpError(err.message) : err);
  }

  async getBtcUahExchangeRate(req, res, next) {
    try {
      const { authorization } = req.headers;

      await this.accessCheckService.verifyAccess(authorization);

      const btcUahExchangeRate = await this.btcService.getBtcUahExchangeRate();

      res.status(200).json({ btcUahExchangeRate });
    } catch (err) {
      passErrorToErrorHandler(err, next);
    }
  }
}

module.exports = BtcRatesController;
