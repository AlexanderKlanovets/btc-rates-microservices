'use strict';

require('dotenv-safe').config();

const validateDebugModeValue = (envVarValue) => {
  const DEBUG_MODE_VALUES = ['0', '1'];

  if (!DEBUG_MODE_VALUES.includes(envVarValue)) {
    throw new Error('Invalid debug mode variable value. Should be 0 or 1.');
  }

  return envVarValue;
};

module.exports = {
  PORT: process.env.PORT,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  DEBUG_MODE: validateDebugModeValue(process.env.DEBUG_MODE),
};
