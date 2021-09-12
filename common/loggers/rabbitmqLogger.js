'use strict';

const { Buffer } = require('buffer');

const amqplib = require('amqplib');

const LOGS_EXCHANGE_NAME = 'logs';

class RabbitMqLogger {
  #isInitialized = false;

  constructor(serviceName, amqpUrl, isDebugMode) {
    this.serviceName = serviceName;
    this.amqpUrl = amqpUrl;
    this.isDebugMode = isDebugMode;
  }

  async init() {
    const rabbitMqConnection = await amqplib.connect(this.amqpUrl);
    this.channel = await rabbitMqConnection.createChannel();

    await this.channel.assertExchange(LOGS_EXCHANGE_NAME, 'direct');

    this.#isInitialized = true;
  }

  log(severity, message) {
    if (!this.#isInitialized) {
      throw new Error(
        'Logger was not initialized! Call async method .init() before usage.',
      );
    }

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

const rabbitMqLoggerAsyncFactory = async (
  serviceName, amqpUrl, isDebugMode,
) => {
  const logger = new RabbitMqLogger(serviceName, amqpUrl, isDebugMode);
  await logger.init();

  return logger;
};

module.exports = rabbitMqLoggerAsyncFactory;
