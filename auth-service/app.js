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

const createApp = () => {
  const userModel = new User(appConfig.DATA_PATH);
  const refreshTokenModel = new RefreshToken(appConfig.DATA_PATH);

  const authService = new AuthService(
    userModel,
    refreshTokenModel,
    { jwtSecret: appConfig.JWT_SECRET },
  );
  const authController = new AuthController(authService);
  const authRouter = getAuthRouter(authController);

  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use(authRouter);

  return app;
};

module.exports = createApp;
