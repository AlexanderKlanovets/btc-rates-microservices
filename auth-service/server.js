'use strict';

const createApp = require('./app');
const { PORT, DEBUG_MODE } = require('./lib/config');

createApp(DEBUG_MODE)
  .then((app) => {
    app.listen(
      PORT,
      /* eslint-disable-next-line */
      () => console.log(`The Auth service has started on port ${PORT}.`),
    );
  });
