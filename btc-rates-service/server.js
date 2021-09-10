'use strict';

const createApp = require('./app');
const { PORT } = require('./lib/config');

createApp().listen(
  PORT,
  /* eslint-disable-next-line */
  () => console.log(`The BTC-rates service has started on port ${PORT}.`),
);
