'use strict';

const serviceErrorsToHttpStatusMap = require('./serviceErrorsToHttpStatusMap');

class BtcRatesController {
  constructor(accessCheckService, btcService, logger) {
    this.accessCheckService = accessCheckService;
    this.btcService = btcService;
    this.logger = logger;
  }

  handleServiceErrorAndSendResponse(err, res) {
    const status = serviceErrorsToHttpStatusMap[err.name];

    if (!status) {
      this.logger.error(err.message);

      res.status(500).json({ message: 'Unknown error!' });

      return;
    }

    res.status(status).json({ message: err.message });
  }

  async getBtcUahExchangeRate(req, res) {
    try {
      const { authentication } = req.headers;

      await this.accessCheckService.verifyAccess(authentication);

      const btcUahExchangeRate = await this.btcService.getBtcUahExchangeRate();

      res.status(200).json({ btcUahExchangeRate });
    } catch (err) {
      this.handleServiceErrorAndSendResponse(err, res);
    }
  }
}

module.exports = BtcRatesController;
