'use strict';

const express = require('express');
const {
  json,
  urlencoded,
} = require('express');

const appConfig = require('./lib/config');

const KunaBtcRatesProvider = require('./application/rates-providers/kunaBtcRatesProvider');
const AccessCheckService = require('./application/services/accessCheckService');
const BtcRatesService = require('./application/services/btcRatesService');
const BtcRatesController = require('./application/controllers/btcRatesController');
const getBtcRatesRouter = require('./application/btcRatesRoutes');

const createApp = () => {
  const btcRatesProvider = new KunaBtcRatesProvider();
  const accessCheckService = new AccessCheckService(
    appConfig.AUTH_SERVICE_URL,
  );
  const btcRatesService = new BtcRatesService(btcRatesProvider);
  const btcRatesController = new BtcRatesController(btcRatesService);
  const btcRatesRouter = getBtcRatesRouter(btcRatesController);

  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use(btcRatesRouter);

  return app;
};

module.exports = createApp;
