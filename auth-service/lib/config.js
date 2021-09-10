'use strict';

require('dotenv-safe').config();

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  DATA_PATH: process.env.DATA_PATH,
};
