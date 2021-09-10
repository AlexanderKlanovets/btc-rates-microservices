'use strict';

const express = require('express');

const getBtcRouter = (btcController) => {
  const router = express.Router();

  router.get(
    '/btcRate',
    (req, res) => btcController.getBtcUahExchangeRate(req, res),
  );

  return router;
};

module.exports = getBtcRouter;
