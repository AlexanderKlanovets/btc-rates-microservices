'use strict';

const logHttpError = (err, logger) => {
  if (err.httpStatus && err.httpStatus < 500) {
    logger.info(`${err.name}: ${err.message}`);
  } else {
    logger.error(err);
  }
};

const sendResponseOnHttpError = (err, res) => {
  const { httpStatus, message } = err;

  if (httpStatus) {
    res.status(httpStatus).json({ message });
  } else {
    res.status(500).json({ message: 'Unknown error!' });
  }
};

module.exports = {
  logHttpError,
  sendResponseOnHttpError,
};
