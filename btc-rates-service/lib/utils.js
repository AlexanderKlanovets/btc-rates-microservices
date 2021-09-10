'use strict';

const http = require('http');
const https = require('https');

class HttpError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;
  }
}

const makeGetRequest = (httpModule, url, options) => new Promise(
  (resolve, reject) => {
    const req = httpModule.get(url, options, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        res.resume();
        reject(new HttpError('Request Failed.', statusCode));
      }

      let rawData = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });
  },
);

const makeHttpGetRequest = (url, options) => makeGetRequest(
  http, url, options,
);

const makeHttpsGetRequest = (url, options) => makeGetRequest(
  https, url, options,
);

module.exports = {
  makeHttpGetRequest,
  makeHttpsGetRequest,
};
