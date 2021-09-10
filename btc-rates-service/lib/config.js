'use strict';

require('dotenv-safe').config();

module.exports = {
  PORT: process.env.PORT,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
};
