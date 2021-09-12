'use strict';

const amqplib = require('amqplib');

const handleMessage = (message) => {
  /* eslint-disable-next-line */
  console.log(message.content.toString());
};

const startWorker = async () => {
  const LOGS_EXCHANGE_NAME = 'logs';
  const QUEUE_NAME = 'error_logs';
  const ERROR_LOGS_ROUTE_KEY = 'ERROR';

  const rabbitMqConnection = await amqplib.connect(process.env.AMQP_URL);
  const channel = await rabbitMqConnection.createChannel();

  const q = await channel.assertQueue(QUEUE_NAME);

  channel.bindQueue(q.queue, LOGS_EXCHANGE_NAME, ERROR_LOGS_ROUTE_KEY);

  channel.consume(QUEUE_NAME, (message) => {
    handleMessage(message);
    channel.ack(message);
  });
};

module.exports = startWorker;
