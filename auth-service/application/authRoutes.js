'use strict';

const express = require('express');

const getAuthRouter = (authController) => {
  const router = express.Router();

  router.post(
    '/user/create',
    (req, res) => authController.register(req, res),
  );

  router.post(
    '/user/login',
    (req, res) => authController.login(req, res),
  );

  router.post(
    '/user/refresh',
    (req, res) => authController.refresh(req, res),
  );

  router.post(
    '/user/logout',
    (req, res) => authController.logout(req, res),
  );

  router.get(
    '/user/verifyToken',
    (req, res) => authController.verifyToken(req, res),
  );

  return router;
};

module.exports = getAuthRouter;
