/* eslint no-console: 0 */

'use strict';

const consoleLogger = (isDebugMode) => ({
  /* eslint-disable-next-line */
  debug: isDebugMode ? console.log : (message) => {},
  info: console.info,
  error: console.error,
});

module.exports = consoleLogger;
