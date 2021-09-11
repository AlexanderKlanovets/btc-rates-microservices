'use strict';

const express = require('express');

const getAuthRouter = (authController) => {
  const router = express.Router();

  router.post(
    '/user/create',
    (req, res, next) => authController.register(req, res, next),
  );

  router.post(
    '/user/login',
    (req, res, next) => authController.login(req, res, next),
  );

  router.post(
    '/user/refresh',
    (req, res, next) => authController.refresh(req, res, next),
  );

  router.post(
    '/user/logout',
    (req, res, next) => authController.logout(req, res, next),
  );

  router.get(
    '/user/verifyToken',
    (req, res, next) => authController.verifyToken(req, res, next),
  );

  return router;
};

module.exports = getAuthRouter;
