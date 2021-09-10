'use strict';

const path = require('path');
const fs = require('fs/promises');

const { NotFoundError } = require('./errors');
const { mkdirIfNotExistsSync } = require('../../lib/utils');

class RefreshToken {
  constructor(storagePath) {
    this.storagePath = path.join(storagePath, 'refreshTokens');
    mkdirIfNotExistsSync(this.storagePath);
  }

  async get(refreshToken) {
    const tokenRecords = await fs.readdir(this.storagePath);
    let email;

    /* eslint-disable-next-line */
    for (const record of tokenRecords) {
      const [recordEmail, recordToken] = record.split(' ');
      if (recordToken === refreshToken) {
        email = recordEmail;
        break;
      }
    }

    if (!email) {
      throw new NotFoundError('Refresh token was not found.');
    }

    return { refreshToken, email };
  }

  async add({ refreshToken, email }) {
    const savePath = path.join(
      this.storagePath,
      `${email} ${refreshToken}`,
    );

    await fs.writeFile(savePath, '');
  }

  async delete(query) {
    const queryFields = ['email', 'refreshToken'];
    const filenamePart = query.refreshToken ? 1 : 0;
    const searchField = queryFields[filenamePart];
    const tokenRecords = await fs.readdir(this.storagePath);
    let tokenPath;

    /* eslint-disable-next-line */
    for (const record of tokenRecords) {
      const currentValue = record.split(' ')[filenamePart];
      if (currentValue === query[searchField]) {
        tokenPath = path.join(this.storagePath, record);
        /* eslint-disable-next-line */
        await fs.unlink(tokenPath);
      }
    }

    if (!tokenPath) {
      throw new NotFoundError('Refresh token was not found.');
    }
  }
}

module.exports = RefreshToken;
