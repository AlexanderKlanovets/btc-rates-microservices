'use strict';

const express = require('express');

const getBtcRouter = (btcController) => {
  const router = express.Router();

  router.get(
    '/btcRate',
    (req, res, next) => btcController.getBtcUahExchangeRate(req, res, next),
  );

  return router;
};

module.exports = getBtcRouter;
