'use strict';

const https = require('https');

const makeGetRequest = (url, options) => new Promise(
  (resolve, reject) => {
    const req = https.get(url, options, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        res.resume();
        reject(new Error(`Request Failed. Status Code: ${statusCode}`));
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

module.exports = {
  makeGetRequest,
};
