'use strict';

const express = require('express');
const {
  json,
  urlencoded,
} = require('express');

const KunaBtcRatesProvider = require('./application/kunaBtcRatesProvider');
const BtcRatesService = require('./application/btcRatesService');
const BtcRatesController = require('./application/btcRatesController');
const getBtcRatesRouter = require('./application/btcRatesRoutes');

const createApp = () => {
  const btcRatesProvider = new KunaBtcRatesProvider();
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
