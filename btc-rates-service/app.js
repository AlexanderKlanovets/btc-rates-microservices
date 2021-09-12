'use strict';

const express = require('express');
const {
  json,
  urlencoded,
} = require('express');

const amqplib = require('amqplib');

const appConfig = require('./lib/config');

const KunaBtcRatesProvider = require('./application/rates-providers/kunaBtcRatesProvider');
const AccessCheckService = require('./application/services/accessCheckService');
const BtcRatesService = require('./application/services/btcRatesService');
const BtcRatesController = require('./application/controllers/btcRatesController');
const getBtcRatesRouter = require('./application/btcRatesRoutes');

const { RabbitMqLogger } = require('../common/loggers');

const {
  logHttpError,
  sendResponseOnHttpError,
} = require('../common/http/helpers');

const SERVICE_NAME = 'BTC-UAH rates service';

const initLogger = async (debug) => {
  const LOGS_EXCHANGE_NAME = 'logs';
  const rabbitMqConnection = await amqplib.connect(appConfig.AMQP_URL);
  const channel = await rabbitMqConnection.createChannel();
  await channel.assertExchange(LOGS_EXCHANGE_NAME, 'direct');

  return new RabbitMqLogger(SERVICE_NAME, channel, debug);
};

const createApp = async (debug = false) => {
  const btcRatesProvider = new KunaBtcRatesProvider();
  const accessCheckService = new AccessCheckService(
    appConfig.AUTH_SERVICE_URL,
  );
  const btcRatesService = new BtcRatesService(btcRatesProvider);

  const logger = await initLogger(debug);

  const btcRatesController = new BtcRatesController(
    accessCheckService,
    btcRatesService,
  );
  const btcRatesRouter = getBtcRatesRouter(btcRatesController);

  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });

  app.use(btcRatesRouter);

  /* eslint-disable-next-line */
  app.use((err, req, res, next) => {
    logHttpError(err, logger);
    sendResponseOnHttpError(err, res);
  });

  return app;
};

module.exports = createApp;
