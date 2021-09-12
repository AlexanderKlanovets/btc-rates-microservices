'use strict';

const express = require('express');
const {
  json,
  urlencoded,
} = require('express');

const amqplib = require('amqplib');

const appConfig = require('./lib/config');

const User = require('./application/models/user');
const RefreshToken = require('./application/models/refreshToken');
const AuthService = require('./application/services/authService');
const AuthController = require('./application/controllers/authController');
const getAuthRouter = require('./application/authRoutes');

const { RabbitMqLogger } = require('../common/loggers');

const {
  logHttpError,
  sendResponseOnHttpError,
} = require('../common/http/helpers');

const SERVICE_NAME = 'Auth service';

const initLogger = async (debug) => {
  const LOGS_EXCHANGE_NAME = 'logs';
  const rabbitMqConnection = await amqplib.connect(appConfig.AMQP_URL);
  const channel = await rabbitMqConnection.createChannel();
  await channel.assertExchange(LOGS_EXCHANGE_NAME, 'direct');

  return new RabbitMqLogger(SERVICE_NAME, channel, debug);
};

const createApp = async (debug = false) => {
  const userModel = new User(appConfig.DATA_PATH);
  const refreshTokenModel = new RefreshToken(appConfig.DATA_PATH);

  const authService = new AuthService(
    userModel,
    refreshTokenModel,
    { jwtSecret: appConfig.JWT_SECRET },
  );

  const logger = await initLogger(debug);

  const authController = new AuthController(authService, logger);
  const authRouter = getAuthRouter(authController);

  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.url}`);
    next();
  });

  app.use(authRouter);

  /* eslint-disable-next-line */
  app.use((err, req, res, next) => {
    logHttpError(err, logger);
    sendResponseOnHttpError(err, res);
  });

  return app;
};

module.exports = createApp;
