'use strict';

require('dotenv-safe').config();

const parseDebugModeValue = (envVarValue) => {
  const DEBUG_MODE_VALUES = ['0', '1'];

  if (!DEBUG_MODE_VALUES.includes(envVarValue)) {
    throw new Error('Invalid debug mode variable value. Should be 0 or 1.');
  }

  return envVarValue === '1';
};

module.exports = {
  PORT: process.env.PORT,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  DEBUG_MODE: parseDebugModeValue(process.env.DEBUG_MODE),
  AMQP_URL: process.env.AMQP_URL,
};
