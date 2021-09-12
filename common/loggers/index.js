'use strict';

const consoleLogger = require('./consoleLogger');
const rabbitMqLoggerAsyncFactory = require('./rabbitmqLogger');

module.exports = {
  consoleLogger,
  rabbitMqLoggerAsyncFactory,
};
