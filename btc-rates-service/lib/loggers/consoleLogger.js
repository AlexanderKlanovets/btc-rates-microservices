'use strict';

const consoleLogger = (isDebugMode) => ({
  debug: isDebugMode ? console.log : (message) => {},
  info: console.info,
  error: console.error,
});

module.exports = consoleLogger;
