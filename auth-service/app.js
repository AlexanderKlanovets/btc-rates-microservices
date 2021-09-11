'use strict';

const express = require('express');
const {
  json,
  urlencoded,
} = require('express');

const appConfig = require('./lib/config');

const User = require('./application/models/user');
const RefreshToken = require('./application/models/refreshToken');
const AuthService = require('./application/services/authService');
const AuthController = require('./application/controllers/authController');
const getAuthRouter = require('./application/authRoutes');

const { consoleLogger } = require('../common/loggers');

const {
  logHttpError,
  sendResponseOnHttpError,
} = require('../common/http/helpers');

const createApp = (debug = false) => {
  const userModel = new User(appConfig.DATA_PATH);
  const refreshTokenModel = new RefreshToken(appConfig.DATA_PATH);

  const authService = new AuthService(
    userModel,
    refreshTokenModel,
    { jwtSecret: appConfig.JWT_SECRET },
  );

  const logger = consoleLogger(debug);

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
