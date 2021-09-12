'use strict';

const { Buffer } = require('buffer');

const LOGS_EXCHANGE_NAME = 'logs';

class RabbitMqLogger {
  constructor(serviceName, channel, isDebugMode) {
    this.serviceName = serviceName;
    this.channel = channel;
    this.isDebugMode = isDebugMode;
  }

  log(severity, message) {
    const currentISODate = new Date().toISOString();
    const errSource = `(from ${this.serviceName})`;
    const formattedMessage = `[${currentISODate}] ${errSource} ${message}`;
    const messageBuffer = Buffer.from(formattedMessage, 'utf-8');

    this.channel.publish(LOGS_EXCHANGE_NAME, severity, messageBuffer);
  }

  debug(message) {
    if (!this.isDebugMode) {
      return;
    }

    this.log('DEBUG', message);
  }

  info(message) {
    this.log('INFO', message);
  }

  error(message) {
    this.log('ERROR', message);
  }
}

module.exports = RabbitMqLogger;
